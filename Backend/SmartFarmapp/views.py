from django.shortcuts import render
from .serializers import ProductsSerializers,UserSerializer
from .models import Products
from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny
# Create your views here.

class CreateViewset(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[AllowAny]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializers
    permission_classes = [AllowAny]  # Temporarily allow any request to see if this resolves the issue





