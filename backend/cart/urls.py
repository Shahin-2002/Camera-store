from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CartViewSet

app_name = "cart"

router = DefaultRouter()
router.register("cart", CartViewSet, basename="cart")

urlpatterns = [
    path("", include(router.urls)),
]
