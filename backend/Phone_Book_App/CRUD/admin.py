from django.contrib import admin
from .models import Form_Details

class User_admin(admin.ModelAdmin):
    list_display=( 'id','First_Name','Last_Name','Phone_Number')
    admin.site.register(Form_Details)