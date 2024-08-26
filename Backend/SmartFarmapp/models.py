from django.db import models
from django.contrib.auth.models import  User
# Create your models here.

class Products(models.Model):
    image = models.ImageField(upload_to='products/', default='path/to/placeholder.jpg')
    product_name = models.CharField(max_length=150, default='Unknown Product')
    product_description = models.TextField(default='No description provided')
    price = models.CharField(max_length=100, default='0.00')
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set on creation
    updated_at = models.DateTimeField(auto_now=True) 
    
    def __str__(self):
        return self.product_name
    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart for {self.user.username}"

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)  # Reference to Products model
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.quantity} of {self.product.product_name} in cart"
