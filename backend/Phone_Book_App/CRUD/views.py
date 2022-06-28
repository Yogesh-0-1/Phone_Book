from django.shortcuts import render
from .models import Form_Details
from .serializers import Seriaizer
from rest_framework import viewsets

# Create your views here.
class MovieViewSet(viewsets.ModelViewSet):
    serializer_class = Seriaizer
    queryset = Form_Details.objects.all()
