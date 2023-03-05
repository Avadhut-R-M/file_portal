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
from .serializers import UserSerializer
from rest_framework import viewsets


@api_view(["POST"])
@permission_classes([AllowAny,])
def login(request):
    email = request.data.get("email")
    password = request.data.get("passward")
    if email is None or password is None:
        return Response({'error': 'Please provide both email and password'},
                        status=HTTP_400_BAD_REQUEST)
    
    if not User.objects.get(email=email):
        return Response({'error': 'Username not found'},
                        status=HTTP_404_NOT_FOUND)
    
    user = User.objects.get(email=email)

    user = authenticate(username=user.username, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key},
                    status=HTTP_200_OK)


@api_view(["POST"])
@permission_classes((AllowAny,))
def signup(request):
    username = request.data.get("username")
    password = request.data.get("passward")
    email = request.data.get("email")

    if username is None or password is None or\
            email is None:
        return Response(
            {'error': 'Please provide username, password, email, username'},
            status=HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'User with same email already exists'},
                        status=HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(username=username).exists():
        return Response({'error': 'User with same username already exists'},
                        status=HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
    )

    return Response({'status': 'User signed up'},
                    status=HTTP_200_OK)


@api_view(["POST"])
def update_user(request):
    username = request.data.get("username")
    user = request.user
    if username is None:
        return Response({'error': 'Please provide both username'},
                        status=HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(username=username).exists():
        return Response({'error': 'User with same username already exists'},
                        status=HTTP_400_BAD_REQUEST)
    user.username = username
    user.save()

    serializer = UserSerializer(user)

    return Response({'data': serializer.data},
                    status=HTTP_200_OK)


@api_view(["GET"])
def get_user(request):
    user = request.user
    if not user:
        return Response({'status': 'User not available'}, status=HTTP_400_BAD_REQUEST)

    serializer = UserSerializer(user)

    return Response({'data': serializer.data},
                    status=HTTP_200_OK)


