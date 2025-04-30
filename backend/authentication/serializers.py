from .models import *
from rest_framework import serializers


class RegularCustomerRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "phone", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate_phone(self, value):
        if not value.isdigit() or not value.startswith("09") or len(value) != 11:
            raise serializers.ValidationError("شماره تلفن وارد شده نامعتبر است.")

        if User.objects.filter(phone=value).exists():
            raise serializers.ValidationError("شماره تلفن وارد شده قبلاً ثبت شده است.")

        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("ایمیل وارد شده قبلا ثبت شده است.")
        return value

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
