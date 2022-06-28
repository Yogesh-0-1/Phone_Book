CRUD App with Axios & Rest Framework

Django Rest Apis Back-end
Overview
These are APIs that Django App will export:

Methods	Urls	Actions
POST	/api/tutorials	create new Tutorial
GET	/api/tutorials	retrieve all Tutorials
GET	/api/tutorials/:id	retrieve a Tutorial by :id
PUT	/api/tutorials/:id	update a Tutorial by :id
DELETE	/api/tutorials/:id	delete a Tutorial by :id
DELETE	/api/tutorials	delete all Tutorials
GET	/api/tutorials?title=[keyword]	find all Tutorials which title contains keyword

Technology
Django 
Django Rest Framework 
dbsqlite3
django-cors-headers 

mplementation
Install Django REST framework
Django REST framework helps us to build RESTful Web Services flexibly.

To install this package, run command:
pip install djangorestframework

Open CRUD/models.py, add Form_Details as subclass of django.db.models.Model.
There are 3 fields: First_Name, Last_Name, Phone_Number.
from django.db import models

# Create your models here.

class Form_Details(models.Model ):
    First_Name=models.CharField(max_length=100)
    Last_Name=models.CharField(max_length=100)
    Phone_Number=models.CharField(max_length=10) 
    
    def __str__(self):
        return self.First_Name
        
        
Migrate Data Model to the database
Run the Python script: python manage.py makemigrations .

apply the generated migration above, run the following Python script:
python manage.py migrate .

Create Serializer class for Data Model
Let’s create Seriaizer class that will manage serialization and deserialization from JSON.
It inherit from rest_framework.serializers.ModelSerializer superclass which automatically populates a set of fields and default validators. We need to specify the model class here.

CRUD/serializers.py
from rest_framework import serializers
from .models import Form_Details

class Seriaizer(serializers.ModelSerializer):
    class Meta:
        model=Form_Details
        fields=['id','First_Name','Last_Name','Phone_Number']

Create a urls.py inside tutorials app with urlpatterns containing urls to be matched with request functions in the views.py:
from rest_framework.routers import DefaultRouter
from CRUD.views import PhoneViewSet
from CRUD import views

router = DefaultRouter()
router.register(r'createUsers', views.PhoneViewSet, basename='user')
urlpatterns = router.urls

Don’t forget to include this URL patterns in root URL configurations.
from django.contrib import admin
from django.urls import path, include
from CRUD import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('CRUD/', include('CRUD.urls')),
    path('user_api/<int:pk>/',views.User_RetrieveUpdateDestroy.as_view()),
]

Write API Views

Open CRUD/views.py and write following code:
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

class User_RetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset=Form_Details.objects.all()
    serializer_class=Seriaizer

Run the Django Rest Api Server
Run our Django Project with command: python manage.py runserver 8080.
The console shows:
Performing system checks...

System check identified no issues (0 silenced).
June 28, 2022 - 23:04:48
Django version 4.0.4, using settings 'Phone_Book_App.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.



React Front-end
Create Reaxt app with "phone-bookfrontend" name

Creating AddUser.js file 
Open src/AddUser and write following code:
import { useState, useEffect } from "react";
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import API from "./API";

const AddUser = ({ onAdd }) => {
  const [First_Name, setFirstName] = useState("");
  const [Last_Name, setLastName] = useState("");
  const [Phone_Number, setPhoneNumber] = useState("");
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    refreshUsers();
  }, []);

  const refreshUsers = () => {
    API.get("/")
      .then((res) => {
        setUsers(res.data);
        // setFirstName(res[0].First_Name)
        // setLastName(res[0].Last_Name)
        // setPhoneNumber(res[0].Phone_Number)
        // setUserId(res[0].id)
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // In future we add Phone_Number in let item
    let item = { First_Name, Last_Name, Phone_Number };
    API.post("/", item).then(() => refreshUsers());
  };

  const onUpdate = (id) => {
    let item = { First_Name };
    API.patch(`/${id}/`, item).then((res) => refreshUsers());
  };

  const onDelete = (id) => {
    API.delete(`/${id}/`).then((res) => refreshUsers());
  };

  function selectUser(id) {
    let item = users.filter((user) => user.id === id)[0];
    setFirstName(item.First_Name);
    setLastName(item.Last_Name);
    setPhoneNumber(item.Phone_Number);
    setUserId(item.id);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <h3 className="float-left">Create a new User</h3>
          <Form onSubmit={onSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicFirst_Name">
              <Form.Label>{userId}First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                value={First_Name}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLast_Name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                value={Last_Name}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone_Number">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Phone Number"
                value={Phone_Number}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Group>

            <div className="float-right">
              <Button
                variant="primary"
                type="submit"
                onClick={onSubmit}
                className="mx-2"
              >
                Save
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={() => onUpdate(userId)}
                className="mx-2"
              >
                Update
              </Button>
            </div>
          </Form>
        </div>
        <div className="col-md-8 m">
          <table class="table">
            <thead>
              <tr>
                {/* <th scope="col">#</th> */}
                <th scope="col">First Name</th>
                <th scope="col">Last_Name</th>
                <th scope="col">Phone Number</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key="">
                    <th scope="row">{user.id}</th>
                    <td> {user.First_Name}</td>
                    <td>{user.Last_Name}</td>
                    <td>{user.Phone_Number}</td>
                    <td>
                      <i
                        className="fa fa-pencil-square text-primary d-inline"
                        aria-hidden="true"
                        onClick={() => selectUser(user.id)}
                      ></i>
                      <i
                        className="fa fa-trash-o text-danger d-inline mx-3"
                        aria-hidden="true"
                        onClick={() => onDelete(user.id)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddUser;

Initialize Axios for React CRUD HTTP Client
create API.js flie 
ope src/API.js write following code:
import axios from "axios";

export default axios.create({
  baseURL: "http://127.0.0.1:8000/CRUD/createUsers",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

Inside App.js :
import {useState, useEffect} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddUser from "./AddUser";

function App() {
  return (
    <div className="App">
      <AddUser />
    </div>
  );
}
export default App;

Run React CRUD App
You can run our App with command: npm start.
If the process is successful, open Browser with Url: http://localhost:8081/ and check it.
