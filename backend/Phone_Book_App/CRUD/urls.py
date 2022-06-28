from rest_framework.routers import DefaultRouter
from CRUD.views import PhoneViewSet
from CRUD import views

router = DefaultRouter()
router.register(r'details', views.PhoneViewSet, basename='phone')
urlpatterns = router.urls