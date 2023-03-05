from django.urls import path, include
from . import views
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register("file", views.FilesView, basename="address")

urlpatterns = [
    path('', include(router.urls))
]