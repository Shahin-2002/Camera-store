from rest_framework import serializers
from .models import Cart, CartItem
from store.serializers import ProductSerializer


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    total_price = serializers.SerializerMethodField()

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

    def get_total_price(self, obj):
        return obj.total_price


class CartSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    items = CartItemSerializer(many=True, read_only=True)
    cart_total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ["id", "user", "items", "cart_total_price"]
        read_only_fields = ["items", "cart_total_price"]

    def get_cart_total_price(self, obj):
        return obj.cart_total_price
