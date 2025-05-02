from .models import *
from rest_framework import serializers


class EmailVerificationRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("این ایمیل قبلا در سیستم ثبت شده است.")
        return value


class EmailVerificationCodeSerializer(serializers.Serializer):
    email = serializers.EmailField()
    verification_code = serializers.CharField(max_length=5)

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("این ایمیل قبلا در سیستم ثبت شده است.")
        return value

    def validate_verification_code(self, value):
        if not value.isdigit() or len(value) != 5:
            raise serializers.ValidationError("کد تایید وارد شده نامعتبر است.")
        return value


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
