from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, generics, status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializers import (
    UserSerializer,
    ProductsSerializers,
    CartSerializer,
    #CartItemSerializer,
    ContactSerializer,
)
from .models import Products, CartItem, Cart
from .ml_models import predict
from rest_framework.permissions import AllowAny,IsAuthenticated

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
            return Response({"error": "Credentials provided were not correct"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'error': "User does not exist"}, status=status.HTTP_404_NOT_FOUND)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializers
    permission_classes = [AllowAny] 

class CartViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]  # Allow both authenticated and unauthenticated access
    serializer_class = CartSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Cart.objects.filter(user=self.request.user).prefetch_related('items__product')
        return None  # Unauthenticated users don't have a database-stored cart

    def create(self, request, *args, **kwargs):
        product = Products.objects.get(id=request.data['product_id'])
        quantity = request.data.get('quantity',1)  # Default quantity to 1 if not provided

        if request.user.is_authenticated:
            cart, created = Cart.objects.get_or_create(user=request.user)
            cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
            if created:
        
                cart_item.quantity = int(quantity)
            else:
        
                cart_item.quantity += int(quantity)
            cart_item.save()
            return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)

        session_cart = request.session.get('cart', [])
        for item in session_cart:
            if item['product_id'] == product.id:
                item['quantity'] += int(quantity)
                break
        else:
            session_cart.append({
                'product_id': product.id,
                'product_name': product.product_name,
                'product_price': product.price,
                'quantity': int(quantity),
            })
        request.session['cart'] = session_cart
        return Response({'cart': session_cart}, status=status.HTTP_200_OK)

    def list(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            try:
                cart = Cart.objects.get(user=request.user)
                return Response(CartSerializer(cart).data)
            except Cart.DoesNotExist:
                return Response({'message': 'Cart not found.'}, status=status.HTTP_404_NOT_FOUND)

        session_cart = request.session.get('cart', [])
        return Response({'cart': session_cart})

    def destroy(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            try:
                cart = Cart.objects.get(user=request.user)
                if kwargs.get('pk') == 'clear':
                    cart.items.all().delete()
                    return Response(status=status.HTTP_204_NO_CONTENT)
                cart_item = CartItem.objects.get(cart=cart, id=kwargs['pk'])
                cart_item.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except (Cart.DoesNotExist, CartItem.DoesNotExist):
                return Response({'message': 'Cart or item not found.'}, status=status.HTTP_404_NOT_FOUND)

        request.session['cart'] = []
        return Response({'cart': []}, status=status.HTTP_200_OK)

    def partial_update(self, request, *args, **kwargs):
        quantity = request.data.get('quantity')
        
        if request.user.is_authenticated:
            try:
                cart_item = CartItem.objects.get(cart__user=request.user, id=kwargs['pk'])
                if quantity is not None:
                    new_quantity = max(cart_item.quantity + int(quantity), 0)
                    if new_quantity == 0:
                        cart_item.delete()
                        return Response(status=status.HTTP_204_NO_CONTENT)
                    cart_item.quantity = new_quantity
                    cart_item.save()
                return Response(cart_item.data, status=status.HTTP_200_OK)
            except (CartItem.DoesNotExist, Cart.DoesNotExist):
                return Response({'message': 'Cart or item not found.'}, status=status.HTTP_404_NOT_FOUND)

        session_cart = request.session.get('cart', [])
        product_id = kwargs['pk']
        
        for item in session_cart:
            if item['product_id'] == product_id:
                new_quantity = max(item['quantity'] + int(quantity), 0)
                if new_quantity == 0:
                    session_cart.remove(item)
                else:
                    item['quantity'] = new_quantity
                break
        request.session['cart'] = session_cart
        return Response({'cart': session_cart}, status=status.HTTP_200_OK)

class ContactView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Your message has been sent successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
