from django.db import models

# Create your models here.

class Form_Details(models.Model ):
    First_Name=models.CharField(max_length=100)
    Last_Name=models.CharField(max_length=100)
    Phone_Number=models.CharField(max_length=10) 
    
    def __str__(self):
        return self.First_Name
