from rest_framework.routers import SimpleRouter
from .views import AddressViewSet
from django.urls import path
from django.urls import include
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register("address", AddressViewSet, basename="address")

urlpatterns = [
    path('', include(router.urls))
]