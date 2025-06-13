from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('aboutus/', views.about, name='about'),
    path('notices/', views.notices, name='notices'),
    path('events/', views.events, name='events'),
    path('login/', views.user_login, name='login'),
    path('magazine/', views.magazine, name='magazine'),
    path('adopted/', views.adopted, name='adopted'),
    path('volunteers/', views.volunteers, name='volunteers'),
    path('nssalumni/', views.nssalumni, name='nssalumni'),
    path('collaborators/', views.collaborators, name='collaborators'),
    path('undp/', views.undp, name='undp'),
    path('admin/', views.admin, name='admin'),
    path('attendance/', views.attendance, name='attendance'),
    path('logout/', views.logout_view, name='logout'),
    path('create-event/', views.create_event, name='create_event'),
    path('mark-attendance/<int:event_id>/', views.mark_attendance, name='mark_attendance'),
    path('view-events/', views.view_events, name='view_events'),
    path('dept-work/', views.assign_department_work, name='assign_work'),
]