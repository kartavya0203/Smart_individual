from django.contrib import admin
from SmartFarmapp.models import *
# Register your models here.
class ProductDesc(admin.ModelAdmin):
    list_display = ('product_name', 'price')

class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 1  # Number of empty forms to display

class CartAdmin(admin.ModelAdmin):
    inlines = [CartItemInline]
    list_display = ('user',)  # Customize the list display

class ContactAdmin(admin.ModelAdmin):
    list_display=('email',)

admin.site.register(Products,ProductDesc)
admin.site.register(Cart, CartAdmin)
admin.site.register(CartItem)
admin.site.register(Contact,ContactAdmin)
