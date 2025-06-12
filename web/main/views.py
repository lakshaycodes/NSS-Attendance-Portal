from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.models import User
from .models import *

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
            return redirect('/')
    
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

@staff_member_required
def admin(request):
    return render(request, 'main/admin.html')