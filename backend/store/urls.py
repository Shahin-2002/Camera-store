from django.urls import path
from . import views


app_name = "store"
urlpatterns = [
    path("categories/", views.CategoryTreeView.as_view()),
    path("products/", views.ProductListCreateView.as_view()),
    path("products/<int:pk>/", views.ProductDetailView.as_view()),
    path("products/latest/", views.LatestProductsView.as_view()),
]
