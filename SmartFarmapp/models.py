from django.db import models
# Create your models here.

class Products(models.Model):
    image = models.ImageField(upload_to='products/', default='path/to/placeholder.jpg')
    product_name = models.CharField(max_length=150, default='Unknown Product')
    product_description = models.TextField(default='No description provided')
    price = models.CharField(max_length=100, default='0.00')
    # created_at = models.DateTimeField(auto_now_add=True)  # Automatically set on creation
    # updated_at = models.DateTimeField(auto_now=True) 
    
    def __str__(self):
        return self.product_name