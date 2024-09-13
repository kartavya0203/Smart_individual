from django.db import models
from django.contrib.auth.models import User 


class Description(models.Model):
    image=models.ImageField(upload_to='IMAGE/')
    product_name=models.TextField(max_length=100)
    product_description=models.TextField(max_length=100)
    pricing=models.IntegerField()
    
