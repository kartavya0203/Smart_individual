from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['username','email','password']
        extra_kwargs={"password":{'write_only':True}}
    def create(self,validated_data):
        user=User(
            email=validated_data['email'],
            username=validated_data['username']
            )
        user.set_password(validated_data['password'])
        user.save()
        Token.objects.create(user=user)
        return user
    
class ProductsSerializers(serializers.ModelSerializer):
      class Meta:      
          model=Products
          fields="__all__"
class CartItemSerializer(serializers.ModelSerializer):
     product_name = serializers.CharField(source='product.product_name', read_only=True)
     product_price = serializers.CharField(source='product.price', read_only=True)
     class Meta:
        model = CartItem
        fields = ['id', 'product_name','product_price','product', 'quantity', 'added_at']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'created_at']
        
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['name', 'email', 'message']