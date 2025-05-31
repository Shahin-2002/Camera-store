from django.urls import path
from . import views

app_name = "orders"

urlpatterns = [
    path("new-order/", views.OrderView.as_view(), name="new-order"),
    path("user-orders/", views.UserOrdersView.as_view(), name="user-orders"),
    path(
        "order-detail/<str:order_id>/",
        views.OrderDetailView.as_view(),
        name="order-detail",
    ),
]
