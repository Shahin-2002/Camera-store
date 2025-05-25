from django.contrib import admin
from .models import Order, OrderItem


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("order_id", "user", "status", "created_at", "total_price")
    list_filter = ("status",)
    search_fields = ("order_id", "user__username")
    readonly_fields = ("created_at", "updated_at")
    list_editable = ("status",)


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("id", "order", "product", "quantity", "price")
    search_fields = ("id", "order__order_id", "product__name")
