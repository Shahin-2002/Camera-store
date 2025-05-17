from rest_framework import serializers
from .models import Cart, CartItem
from store.serializers import ProductSerializer


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    price = serializers.ReadOnlyField()
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = CartItem
        fields = ["id", "cart", "product", "quantity", "price", "total_price"]
        read_only_fields = ["price", "total_price"]

    def create(self, validated_data):
        product = validated_data["product"]
        validated_data["price"] = product.new_price
        return super().create(validated_data)

    def update(self, instance, validated_data):
        instance.quantity = validated_data.get("quantity", instance.quantity)
        instance.save()
        return super().update(instance, validated_data)


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    cart_total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ["id", "user", "is_active", "items", "cart_total_price"]
        read_only_fields = ["items", "cart_total_price"]

    def get_cart_total_price(self, obj):
        return sum(item.total_price for item in obj.items.all())
