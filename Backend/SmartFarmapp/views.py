from django.shortcuts import redirect
from django.views import View
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render
from .serializers import *
from .models import *
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
    permission_classes = [AllowAny] 


class CartViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CartSerializer

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        cart, created = Cart.objects.get_or_create(user=request.user)
        product = Products.objects.get(id=request.data['product_id'])
        quantity = request.data.get('quantity')
        
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created:
            cart_item.quantity +=  int(quantity)
        cart_item.save()

        return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        cart = Cart.objects.get(user=self.request.user)
        cart_item = CartItem.objects.get(cart=cart, id=kwargs['pk'])
        cart_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def list(self, request, *args, **kwargs):
        cart = Cart.objects.get(user=request.user)
        return Response(CartSerializer(cart).data)