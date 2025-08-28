from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import CartItem


@receiver(signal=pre_save, sender=CartItem)
def calculate_cart_item_price(sender, instance, **kwargs):
    instance.price = instance.product.new_price
