from django.db import models
from authentication.models import User
from store.models import Product


class Cart(models.Model):
    user = models.OneToOneField(to=User, on_delete=models.CASCADE, related_name="cart")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "سبد خرید"
        verbose_name_plural = "سبد های خرید"

    def __str__(self):
        return f"Cart for {self.user.username}"

    @property
    def cart_total_price(self):
        return sum(item.total_price for item in self.items.all())


class CartItem(models.Model):
    cart = models.ForeignKey(to=Cart, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(
        to=Product, on_delete=models.CASCADE, related_name="cart_items"
    )
    quantity = models.PositiveIntegerField(default=1)
    price = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("cart", "product")
        verbose_name = "آیتم سبد خرید"
        verbose_name_plural = "آیتم های سبد خرید"

    def __str__(self):
        return f"{self.quantity} x {self.product.name} in cart {self.cart.id}"

    @property
    def total_price(self):
        return self.price * self.quantity
