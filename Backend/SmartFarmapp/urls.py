from django.urls import path,include
from rest_framework import routers
from .views import ProductViewSet,RandomForestPrediction
router=routers.DefaultRouter()
router.register(r'product',ProductViewSet)


urlpatterns = [
    path('',include(router.urls)),
    path('predict/', RandomForestPrediction.as_view(), name='random_forest_prediction'), 
]