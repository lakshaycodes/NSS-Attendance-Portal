from django.contrib import admin
from .models import Event, Attendance, Volunteer, AssignedWork
from django.contrib.auth.models import User

# Inline to add attendance from Event page
class AttendanceInline(admin.TabularInline):
    model = Attendance
    extra = 1

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['name', 'date']
    inlines = [AttendanceInline]

@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ['event', 'volunteer', 'status', 'timestamp']
    list_filter = ['event', 'status']
    search_fields = ['volunteer__roll_number', 'event__name']

@admin.register(Volunteer)
class VolunteerAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'roll_number', 'type', 'branch', 'year', 'email', 'phone']
    search_fields = ['first_name', 'last_name', 'roll_number', 'email', 'phone']
    list_filter = ['type', 'branch', 'year']

@admin.register(AssignedWork)
class AssignedWorkAdmin(admin.ModelAdmin):
    list_display = ['dept', 'volunteer', 'assigned_by', 'assigned_at', 'hours', 'task']
    list_filter = ['dept', 'assigned_by', 'assigned_at']
    search_fields = ['volunteer__first_name', 'volunteer__roll_number', 'task', 'assigned_by__username']
    readonly_fields = ['assigned_at']