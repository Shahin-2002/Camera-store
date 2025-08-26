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


class PasswordResetEmailVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("ایمیل وارد شده در سیستم وجود ندارد.")
        return value


class PasswordResetEmailVerificationCodeSerializer(serializers.Serializer):
    email = serializers.EmailField()
    verification_code = serializers.CharField(max_length=5)

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("ایمیل وارد شده در سیستم وجود ندارد.")
        return value

    def validate_verification_code(self, value):
        if not value.isdigit() or len(value) != 5:
            raise serializers.ValidationError("کد تایید وارد شده نامعتبر است.")
        return value


class PasswordResetSeializer(serializers.Serializer):
    email = serializers.EmailField()
    new_password = serializers.CharField(max_length=16, write_only=True)
    confirm_password = serializers.CharField(max_length=16, write_only=True)

    def validate(self, attrs):
        new_password = attrs.get("new_password")
        confirm_password = attrs.get("confirm_password")

        if not new_password or not confirm_password:
            raise serializers.ValidationError(
                "هر دو فیلد رمز عبور جدید و تایید رمز عبور الزامی هستند."
            )

        if new_password != confirm_password:
            raise serializers.ValidationError(
                "رمز عبور جدید و تایید رمز عبور مطابقت ندارند."
            )

        return attrs


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "role",
            "profile_picture",
        ]
        read_only_fields = ["id"]
