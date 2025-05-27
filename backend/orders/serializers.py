from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["id", "order", "product", "quantity", "price", "total_price"]
        read_only_fields = ["id", "total_price"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = "__all__"
        read_only_fields = [
            "order_id",
            "user",
            "status",
            "items",
            "created_at",
            "updated_at",
            "total_price",
        ]

    def create(self, validated_data):
        request = self.context["request"]
        user = request.user
        cart = user.cart
        items_data = [
            {
                "product": item.product,
                "quantity": item.quantity,
                "price": item.product.new_price,
            }
            for item in cart.items.all()
        ]
        order = Order.objects.create(
            user=user,
            province=validated_data["province"],
            city=validated_data["city"],
            address=validated_data["address"],
            postal_code=validated_data["postal_code"],
        )

        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order
