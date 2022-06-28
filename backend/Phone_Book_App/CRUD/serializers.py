from rest_framework import serializers
from .models import Form_Details

class Seriaizer(serializers.ModelSerializer):
    class Meta:
        model=Form_Details
        fields=['id','First_Name','Last_Name']