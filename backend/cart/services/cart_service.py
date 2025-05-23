from cart.models import Cart, CartItem
from store.models import Product
from django.shortcuts import get_object_or_404


class CartService:
    def __init__(self, user):
        self.user = user
        self.cart, _ = Cart.objects.get_or_create(user=user)

    def add_item(self, product_id, quantity=1):
        product = get_object_or_404(Product, pk=product_id)
        item, created = CartItem.objects.get_or_create(cart=self.cart, product=product)

        if not created:
            item.quantity += quantity
        else:
            item.quantity = quantity

        item.save()
        return item

    def update_item(self, product_id, quantity):
        item = CartItem.objects.filter(cart=self.cart, product=product_id).first()
        if item:
            item.quantity = quantity
            item.save()
        return item

    def remove_item(self, product_id):
        CartItem.objects.filter(cart=self.cart, product=product_id).delete()

    def clear_cart(self):
        self.cart.items.all().delete()

    def get_items(self):
        return self.cart.items.select_related("product").all()
