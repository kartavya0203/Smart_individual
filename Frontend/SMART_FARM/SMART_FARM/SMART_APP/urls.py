from django.urls import path
from .views import home_view, shop_view, yield_analysis_view, cart_view, sign_in_view, sign_out_view

urlpatterns = [
    path('', home_view, name='home'),
    path('shop/', shop_view, name='shop'),
    path('yield-analysis/', yield_analysis_view, name='yield_analysis'),
    path('cart/', cart_view, name='cart'),
    path('sign-in/', sign_in_view, name='sign_in'),
    path('sign-out/', sign_out_view, name='sign_out'),
    path('predict/', views.predict, name='predict'),

]
