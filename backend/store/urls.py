from django.urls import path
from . import views

urlpatterns = [
    path('items/', views.get_items ),
    path('items/<int:pk>/', views.get_item ),
    path('category/', views.get_categories ),
    path('cart/', views.get_cart),
    path('cart/add/', views.add_to_cart),
    path('cart/remove/', views.remove_from_cart),



]
