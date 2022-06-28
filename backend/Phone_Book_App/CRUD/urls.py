from rest_framework.routers import DefaultRouter
from CRUD.views import PhoneViewSet
from CRUD import views

router = DefaultRouter()
router.register(r'createUsers', views.PhoneViewSet, basename='user')
urlpatterns = router.urls