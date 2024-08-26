from django.urls import path,include
from rest_framework import routers
from .views import *
router=routers.DefaultRouter()
router.register(r'product',ProductViewSet,basename="product")
router.register(r'cartview',CartViewSet,basename='cart')

urlpatterns = [
    path('',include(router.urls)),
    path('predict/', RandomForestPrediction.as_view(), name='random_forest_prediction'), 
]