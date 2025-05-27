from django.urls import path
from . import views

app_name = "orders"

urlpatterns = [
    path("new-order/", views.OrderView.as_view(), name="new-order"),
]
