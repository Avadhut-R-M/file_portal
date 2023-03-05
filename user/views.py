from django.conf import settings
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from .models import Address
from .serializers import AddressSerializer,UserSerializer
# Create your views here.


class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = AddressSerializer
    queryset = Address.objects.all()

    def list(self, request, *args, **kwargs):
        user = 1
        queryset = self.get_queryset()
        queryset = queryset.filter(user = user)
        serializer = AddressSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        data = request.data
        data['user'] = 1
        serializer = self.get_serializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response({'data': serializer.data})
        return Response({'error': serializer.errors})


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        data = request.data
        username = data.get('username', '')
        email = data.get('email', '')
        passward = data.get('passward', '')

        if not username or not email or not passward:
            return Response({'error': 'All data required'}, status=HTTP_400_BAD_REQUEST)
        
        if User.objects.get(email=email).count():
            return Response({'error': 'User with email exist'}, status=HTTP_400_BAD_REQUEST)
        
        if User.objects.get(username=username).count():
            return Response({'error': 'User with username exist'}, status=HTTP_400_BAD_REQUEST)
        
        return Response({'status': 'success'}, status=HTTP_200_OK)
    
    def retrieve(self, request, *args, **kwargs):
        user = request.user
        serializer = UserSerializer(user)
        return Response({'data': serializer.data}, status=HTTP_200_OK)
    