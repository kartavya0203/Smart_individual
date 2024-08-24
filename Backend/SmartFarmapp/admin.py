from django.contrib import admin
from SmartFarmapp.models import Products
# Register your models here.
class ProductDesc(admin.ModelAdmin):
    list_display=('price')
admin.site.register(Products)
