from django.shortcuts import redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from .models import *
from rest_framework import viewsets, generics, status
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated,AllowAny
from .ml_models import predict
from django.contrib.auth import authenticate

class RandomForestPrediction(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        input_data = request.data
        
        try:
            crop_name = predict(input_data)
            return Response({'predicted_crop': crop_name}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CreateViewset(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        try:
            user = User.objects.get(email=email)
            user = authenticate(username=user.username, password=password)
            if user:
                return Response({"token": user.auth_token.key})
            else:
                return Response({"error": "Credentials provided were not correct"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'error': "User does not exist"}, status=status.HTTP_404_NOT_FOUND)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializers
    permission_classes = [AllowAny] 

class CartViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]  # Change to IsAuthenticated if needed
    serializer_class = CartSerializer

    def get_queryset(self):
        user = self.request.user
        return Cart.objects.filter(user=user) if user.is_authenticated else Cart.objects.none()

    def create(self, request, *args, **kwargs):
        user = request.user
        if not user.is_authenticated:
            return Response({"error": "Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)

        cart, created = Cart.objects.get_or_create(user=user)
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)  # Default to 1 if not provided
        
        try:
            product = Products.objects.get(id=product_id)
        except Products.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created:
            cart_item.quantity += int(quantity)
        else:
            cart_item.quantity = int(quantity)
        cart_item.save()

        return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        user = request.user
        if not user.is_authenticated:
            return Response({"error": "Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)

        cart = Cart.objects.get(user=user)
        cart_item = CartItem.objects.get(cart=cart, id=kwargs['pk'])
        cart_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def partial_update(self, request, *args, **kwargs):
        user = request.user
        if not user.is_authenticated:
            return Response({"error": "Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)

        cart_item = CartItem.objects.get(cart__user=user, id=kwargs['pk'])
        quantity = request.data.get('quantity')
        
        if quantity is not None:
            cart_item.quantity = max(cart_item.quantity + int(quantity), 0)
            if cart_item.quantity == 0:
                cart_item.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            cart_item.save()
        
        return Response(CartItemSerializer(cart_item).data, status=status.HTTP_200_OK)

    def list(self, request, *args, **kwargs):
        user = request.user
        if not user.is_authenticated:
            return Response({"error": "Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)

        cart = Cart.objects.get(user=user)
        cart_data = CartSerializer(cart).data
        total_cost = sum(float(item['product_price']) * item['quantity'] for item in cart_data['items'])
        cart_data['total_cost'] = total_cost

        return Response(cart_data)


class ContactView(APIView):
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Save the valid data to the database
            return Response({"message": "Your message has been sent successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
