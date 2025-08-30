from django.db import models
from authentication.models import User
from cart.models import Cart, CartItem
import uuid
from store.models import Product


class Order(models.Model):
    class OrderStatus(models.TextChoices):
        PENDING = "pending", "در حال بررسی"
        PAID = "paid", "پرداخت شده"
        SHIPPED = "shipped", "ارسال شده"
        DELIVERED = "delivered", "تحویل داده شده"
        CANCELLED = "cancelled", "لغو شده"

    order_id = models.UUIDField(primary_key=True, default=uuid.uuid4)

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    status = models.CharField(
        max_length=20, choices=OrderStatus.choices, default=OrderStatus.PENDING
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    province = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    address = models.TextField()
    postal_code = models.CharField(max_length=10)

    class Meta:
        verbose_name = "سفارش"
        verbose_name_plural = "سفارشات"

    def __str__(self):
        return f"Order {self.order_id} - {self.user.username}"

    @property
    def total_price(self):
        return sum(item.price * item.quantity for item in self.items.all())


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="order_items"
    )
    quantity = models.PositiveIntegerField(default=1)
    price = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "آیتم سفارش"
        verbose_name_plural = "آیتم های سفارش"

    def __str__(self):
        return f"{self.quantity} x {self.product.name} in order {self.order.order_id}"

    @property
    def total_price(self):
        return self.price * self.quantity
