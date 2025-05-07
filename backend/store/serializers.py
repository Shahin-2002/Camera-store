from .models import *
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ["id", "name", "slug", "children"]

    def get_children(self, obj):
        if obj.get_children():
            return CategorySerializer(obj.get_children(), many=True).data
        return []


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "slug", "description", "stock", "price", "category"]
        read_only_fields = ["id"]

    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("قیمت باید بیشتر از صفر باشد.")
        return value
