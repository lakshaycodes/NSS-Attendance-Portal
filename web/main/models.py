from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
import secrets
import string
from django.core.mail import send_mail
from django.conf import settings

class Volunteer(models.Model):
    VOLUNTEER_TYPES = [
        ('Core Member', 'Core Member'),
        ('Certificate Volunteer', 'Certificate Volunteer'),
        ('CC Volunteer', 'CC Volunteer'),
    ]

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    roll_number = models.CharField(max_length=15, unique=True, default='Not Assigned')
    type = models.CharField(max_length=30, choices=VOLUNTEER_TYPES, default='Certificate Volunteer')
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    branch = models.CharField(max_length=50)
    year = models.CharField(max_length=10, blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} ({self.roll_number})"
@receiver(post_save, sender=Volunteer)
def create_user_for_volunteer(sender, instance, created, **kwargs):
    if created and instance.email:
        try:
            # Check if user already exists
            User.objects.get(username=instance.roll_number)
        except User.DoesNotExist:
            # Create random password
            password = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(10))
            user = User.objects.create_user(
                username=instance.roll_number,
                email=instance.email,
                password=password,
                first_name=instance.first_name,
                last_name=instance.last_name or '',
                is_staff=True if instance.type == 'Core Member' else False,
            )
            print(f"User created for {instance.roll_number} with password: {password}")

            subject = "Your NSS NSUT Login Credentials"
            message = f"""
Dear {instance.first_name},

Your account for NSS NSUT has been created.

Login details:
Username (Roll Number): {instance.roll_number}
Password: {password}

Login here: http://nssnsut.vercel.app/login/

For security, please change your password after first login.

Regards,
NSS NSUT CELL
"""
            send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [instance.email])

    
class Event(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    date = models.DateField()
    location = models.CharField(max_length=255, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    hours = models.FloatField(("Hours"), default=0.0, help_text=("Number of hours for the event"))
    volunteers = models.ManyToManyField(Volunteer, through='Attendance', related_name='events')


    def __str__(self):
        return self.name

class Attendance(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    volunteer = models.ForeignKey(Volunteer, on_delete=models.CASCADE)
    status = models.BooleanField(default=False)  # Present or Absent
    timestamp = models.DateTimeField(auto_now_add=True)

class AssignedWork(models.Model):
    DEPARTMENTS = [
        ('Tech', 'Tech'),
        ('Design', 'Design'),
        ('Content', 'Content'),
        ('Logistics', 'Logistics'),
        ('Social Media', 'Social Media'),
        ('Public Relations', 'Public Relations'),
        ('Miscellaneous', 'Miscellaneous'),
    ]

    dept = models.CharField(max_length=30, choices=DEPARTMENTS, default='Miscellaneous')
    volunteer = models.ForeignKey(Volunteer, on_delete=models.CASCADE)
    task = models.TextField()
    date = models.DateField(default='2023-01-01', help_text=("Date when the work is assigned"))
    hours = models.FloatField(("Hours"), default=0.0, help_text=("Number of hours for the work"))
    assigned_at = models.DateTimeField(auto_now_add=True)
    assigned_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.dept} | {self.volunteer.roll_number} | {self.task[:30]}..."