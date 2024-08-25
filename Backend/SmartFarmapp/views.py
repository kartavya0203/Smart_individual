from django.shortcuts import redirect
from django.views import View
import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render
from .serializers import ProductsSerializers, UserSerializer
from .models import Products
from rest_framework import viewsets, generics,status
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny
from .ml_models import predict

#model_loader = predict()

class RandomForestPrediction(APIView):
    permission_classes=[AllowAny]
    def post(self, request):
        # Get input data from the request
        input_data = request.data
        
        try:
            # Pass the input data to the prediction function
            crop_name = predict(input_data)
            
            # Return the predicted crop name in the response
            return Response({'predicted_crop': crop_name}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CreateViewset(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[AllowAny]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializers
    permission_classes = [AllowAny]  # Temporarily allow any request to see if this resolves the issue

class HomePageView(View):
    def get(self, request):
        return redirect('')



