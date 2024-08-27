from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','password']
        extra_kwargs={"password":{'write_only':True}}
    def create(self,validated_data):
        user=User.objects.create_user(**validated_data)
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