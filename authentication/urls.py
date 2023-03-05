from rest_framework.routers import SimpleRouter
from .views import login, signup, get_user, update_user
from django.urls import path
from django.urls import include
from rest_framework.routers import SimpleRouter

router = SimpleRouter()

urlpatterns = [
    path('login', login, name='login'),
    path('signup', signup, name='signup'),
    path('get_user', get_user, name='get_user'),
    path('update_user', update_user, name='update_user')
]