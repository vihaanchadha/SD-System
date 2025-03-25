from django.db import models
from django.contrib.auth.models import User

class Client(models.Model):
    hostname = models.CharField(max_length=100)
    ip_address = models.GenericIPAddressField()
    os_type = models.CharField(max_length=50)
    status = models.CharField(max_length=20, choices=[
        ('online', 'Online'),
        ('offline', 'Offline')
    ])
    last_checkin = models.DateTimeField(auto_now=True)

