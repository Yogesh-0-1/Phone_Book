from django.shortcuts import render
from .models import Form_Details
from .serializers import Seriaizer
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView

# Create your views here.
class PhoneViewSet(viewsets.ModelViewSet):
    serializer_class = Seriaizer
    queryset = Form_Details.objects.all()

# class User_ListCreate(generics.ListCreateAPIView):
#     queryset=Form_Details.objects.all()
#     serializer_class=Seriaizer   

class User_RetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset=Form_Details.objects.all()
    serializer_class=Seriaizer
