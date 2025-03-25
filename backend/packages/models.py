from django.db import models

class Package(models.Model):
    name = models.CharField(max_length=100)
    version = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.name} - {self.version}"