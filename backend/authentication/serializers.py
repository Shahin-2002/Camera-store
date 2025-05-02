from .models import *
from rest_framework import serializers
from django.contrib.auth import authenticate


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


class LoginSerializer(serializers.Serializer):
    email_or_username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email_or_username = data.get("email_or_username")
        password = data.get("password")

        if not email_or_username or not password:
            raise serializers.ValidationError(
                "ایمیل/نام کاربری و رمز عبور الزامی هستند."
            )

        # Use a custom authentication system that also checks email
        user = authenticate(username=email_or_username, password=password)

        if user is None:
            raise serializers.ValidationError(
                "ایمیل/نام کاربری یا رمز عبور اشتباه است."
            )

        data["user"] = user
        return data
