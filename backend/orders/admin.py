from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("order_id", "user", "status", "created_at", "total_price")
    list_filter = ("status",)
    search_fields = ("order_id", "user__username")
    readonly_fields = ("created_at", "updated_at")
    list_editable = ("status",)
    inlines = [OrderItemInline]


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("order", "product", "quantity", "price", "total_price")
    search_fields = ("order__order_id", "product__name")
    list_display_links = ("order",)
