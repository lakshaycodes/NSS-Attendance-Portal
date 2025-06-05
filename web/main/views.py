from django.shortcuts import render
from django.http import HttpResponse 

# Create your views here.
def home(request):
    return render(request, 'main/index.html')

def about(request):
    return render(request, 'main/aboutus.html')

def notices(request):
    return render(request, 'main/notices.html')

def events(request):
    return render(request, 'main/events.html')

def attendance(request):
    return render(request, 'main/attendance.html')

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