from django.db import models

class Form_Details(models.Model ):
    First_Name=models.CharField(max_length=100)
    Last_Name=models.CharField(max_length=100) 
    
    def __str__(self):
        return self.First_Name
