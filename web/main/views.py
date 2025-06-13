from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.models import User
from .models import *
import datetime

# Create your views here.
def home(request):
    return render(request, 'main/index.html')

def about(request):
    return render(request, 'main/aboutus.html')

def notices(request):
    return render(request, 'main/notices.html')

def events(request):
    return render(request, 'main/events.html')

def user_login(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        # Check if a user with the provided username exists
        if not User.objects.filter(username=username).exists():
            # Display an error message if the username does not exist
            messages.error(request, 'Invalid Username')
            return redirect('/login/')
        
        # Authenticate the user with the provided username and password
        user = authenticate(username=username, password=password)
        
        if user is None:
            # Display an error message if authentication fails (invalid password)
            messages.error(request, "Invalid Password")
            return redirect('/login/')
        else:
            # Log in the user and redirect to the home page upon successful login
            login(request, user)
            return redirect('/attendance')
    
    # Render the login page template (GET request)
    return render(request, 'main/login.html')

def magazine(request):
    return render(request, 'main/magazine.html')

def adopted(request):
    return render(request, 'main/adopted.html')

def volunteers(request):
    return render(request, 'main/volunteers.html')

def nssalumni(request):
    return render(request, 'main/nssalumni.html')

def collaborators(request):
    return render(request, 'main/collaborators.html')

def undp(request):
    return render(request, 'main/undp.html')


def admin(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        # Check if a user with the provided username exists
        if not User.objects.filter(username=username).exists():
            # Display an error message if the username does not exist
            messages.error(request, 'Invalid Username')
            return redirect('/login/')
        
        # Authenticate the user with the provided username and password
        user = authenticate(username=username, password=password)
        
        if user is None:
            # Display an error message if authentication fails (invalid password)
            messages.error(request, "Invalid Password")
            return redirect('/login/')
        else:
            # Log in the user and redirect to the home page upon successful login
            login(request, user)
            return redirect('/admin/')

    else:
        if not request.user.is_staff:
            return redirect('/logout/')
        return render(request, 'main/admin.html')

def attendance(request):
    if request.user.is_authenticated:
        events_attended = Attendance.objects.filter(volunteer__roll_number=request.user.username).select_related('event').order_by('event__date')
        if not events_attended:
            messages.info(request, 'No attendance records found for this user.')
        else:
            messages.success(request, 'Attendance records retrieved successfully.')

        department_work = AssignedWork.objects.filter(volunteer__roll_number=request.user.username).order_by('date')
        return render(request, 'main/attendance.html', {'events_attended': events_attended, 'department_work': department_work})
    else:
        return redirect('/login/')
    
def logout_view(request):

    logout(request)
    return redirect('/login/')

def create_event(request):
    if request.method == "POST":
        event_name = request.POST.get('event_name')
        event_date = request.POST.get('event_date')
        event_location = request.POST.get('event_location')
        working_hours = request.POST.get('working_hours')
        # Create a new Event object and save it to the database
        new_event = Event(name=event_name, date=event_date, location=event_location, hours=working_hours, created_by=request.user)
        new_event.save()
        
        messages.success(request, 'Event created successfully!')
        return redirect('/admin')
    
    return render(request, 'main/ev-creation.html')

def view_events(request):
    if request.user.is_authenticated:
        events = Event.objects.all()
        return render(request, 'main/view-events.html', {'events': events})
    else:
        return redirect('/login/')
def mark_attendance(request, event_id):
    if request.user.is_staff:
        event = Event.objects.get(id=event_id)
        volunteers = Volunteer.objects.all()
        if request.method == "POST":
            present_ids = request.POST.getlist('present_volunteers')
            present_ids = list(map(int, present_ids))

            for volunteer in volunteers:
                user = User.objects.filter(username=volunteer.roll_number).first()
                if not user:
                    continue  # Skip if user not created

                Attendance.objects.update_or_create(
                    event=event,
                    volunteer=Volunteer.objects.get(roll_number=user.username),
                    defaults={'status': volunteer.id in present_ids}
                )

            return redirect('/admin')
        attendance_records = Attendance.objects.filter(event=event, status=True)

    # Get a set of volunteer IDs who are marked present
        present_volunteer_ids = set()
        for record in attendance_records:
            volunteer = Volunteer.objects.filter(roll_number=record.volunteer.roll_number).first()
            if volunteer:
                present_volunteer_ids.add(volunteer.id)
        return render(request, 'main/MarkAttendence.html', {'event': event, 'volunteers': volunteers, 'present_volunteer_ids': present_volunteer_ids})
    else:
        return redirect('/login/')
    
def view_events(request):
    if request.user.is_staff:
        events = Event.objects.all()
        return render(request, 'main/ManageAttendence.html', {'events': events})
    else:
        return redirect('/logout/')
    
def assign_department_work(request):
    if request.method == 'POST':
        roll_number = request.POST.get('roll_number')
        dept = request.POST.get('dept')
        task = request.POST.get('task')
        hours = float(request.POST.get('hours'))
        date = datetime.date.fromisoformat(request.POST.get('date'))

        try:
            volunteer = Volunteer.objects.get(roll_number=roll_number)
        except Volunteer.DoesNotExist:
            messages.error(request, f"No volunteer found with roll number {roll_number}")
            return redirect('/admin')  # replace with your actual template name or URL name

        AssignedWork.objects.create(
            volunteer=volunteer,
            dept=dept,
            task=task,
            hours=hours,
            date=date,
            assigned_by=request.user
        )

        messages.success(request, f"Work successfully assigned to {volunteer.first_name} ({roll_number})")
        return redirect('assign_work')  # replace with your actual template name or URL name

    return render(request, 'main/department-work.html')  # your template with the form