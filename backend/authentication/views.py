import random
from .models import User
from .serializers import *
from rest_framework import status
from django.core.cache import cache
from django.core.mail import send_mail
from rest_framework.views import APIView
from config.settings import EMAIL_HOST_USER
from rest_framework.response import Response
from .authentication import CookieJWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken


class EmailVerificationRequestView(APIView):
    def post(self, request):
        serializer = EmailVerificationRequestSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data["email"]

            # Check for excessive requests for verification codes in a short period
            rate_key = f"email_rate_limit:{email}"
            if cache.get(rate_key):
                return Response(
                    {"error": "لطفاً کمی صبر کنید و دوباره تلاش کنید."},
                    status=status.HTTP_429_TOO_MANY_REQUESTS,
                )

            # Generate a 5-digit verification code
            verification_code = str(random.randint(10000, 99999))

            # Store the verification code in the cache
            cache.set(
                f"email_verification_code:{email}", verification_code, timeout=120
            )

            # Set a rate limit for sending requests for 120 seconds
            cache.set(rate_key, True, timeout=120)

            # Send an email with the verification code
            send_mail(
                subject="کد تایید سیستم",
                message=f"کد تایید شما: {verification_code}\nاین کد به مدت ۲ دقیقه معتبر است.\nفروشگاه دوربین شهر",
                from_email=EMAIL_HOST_USER,
                recipient_list=[email],
            )

            return Response(
                {"message": "یک کد ۵ رقمی به ایمیل شما ارسال شد."},
                status=status.HTTP_200_OK,
            )

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmailVerificationCodeView(APIView):
    def post(self, request):
        serializer = EmailVerificationCodeSerializer(data=request.data)

        if serializer.is_valid():
            entered_email = serializer.validated_data["email"]
            entered_verification_code = serializer.validated_data["verification_code"]

            cached_verification_code = cache.get(
                f"email_verification_code:{entered_email}"
            )

            if cached_verification_code is None:
                return Response(
                    {"error": "کد تایید منقضی شده است."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if cached_verification_code != entered_verification_code:
                return Response(
                    {"error": "کد تایید اشتباه است."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            cache.delete(entered_email)

            # Store a flag in the cache indicating the email is verified, valid for 15 minutes
            cache.set(f"email_verified:{entered_email}", True, timeout=900)

            return Response(
                {"message": "کد با موفقیت تایید شد."},
                status=status.HTTP_200_OK,
            )


class RegularCustomerRegistrationView(APIView):
    def post(self, request):
        serializer = RegularCustomerRegistrationSerializer(data=request.data)

        if serializer.is_valid():
            user_data = serializer.validated_data

            if cache.get(f"email_verified:{user_data["email"]}"):
                user = serializer.save()
                response = Response(
                    {"message": "ثبت نام با موفقیت انجام شد.", "user": serializer.data},
                    status=status.HTTP_201_CREATED,
                )

                # Generate JWT tokens for the user
                refresh_token = RefreshToken.for_user(user)
                tokens = {
                    "refresh": str(refresh_token),
                    "access": str(refresh_token.access_token),
                }

                # set tokens as HTTP-only cookies
                for name, token in tokens.items():
                    response.set_cookie(
                        key=name,
                        value=token,
                        httponly=True,
                        secure=False,
                        samesite="Lax",
                    )

                cache.delete(f"email_verified:{user_data["email"]}")

                return response

            else:
                return Response(
                    {
                        "error": "ایمیل شما تایید نشده است یا مدت اعتبار آن به پایان رسیده است."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"]

            refresh = RefreshToken.for_user(user)
            tokens = {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }

            response = Response(
                {"message": "کاربر با موفقیت لاگین شد", "user": user.username},
                status=status.HTTP_200_OK,
            )

            for name, token in tokens.items():
                response.set_cookie(
                    key=name,
                    value=token,
                    httponly=True,
                    secure=False,
                    samesite="Lax",
                )

            return response

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

    def get(self, request):
        user = request.user
        return Response({"username": user.username}, status=status.HTTP_200_OK)


class LogoutView(APIView):
    def post(self, request):
        response = Response(
            {"message": "کاربر با موفقیت از سیستم خارج شد."}, status=status.HTTP_200_OK
        )

        response.delete_cookie("access")
        response.delete_cookie("refresh")

        return response


class PasswordResetEmailVerificationView(APIView):
    def post(self, request):
        serializer = PasswordResetEmailVerificationSerializer(data=request.data)

        if serializer.is_valid():

            email = serializer.validated_data["email"]

            # Check for excessive requests for verification codes in a short period
            rate_key = f"email_rate_limit:{email}"
            if cache.get(rate_key):
                return Response(
                    {"error": "لطفاً کمی صبر کنید و دوباره تلاش کنید."},
                    status=status.HTTP_429_TOO_MANY_REQUESTS,
                )

            # Generate a 5-digit verification code
            verification_code = str(random.randint(10000, 99999))

            # Store the verification code in the cache
            cache.set(
                f"email_verification_code:{email}", verification_code, timeout=120
            )

            # Set a rate limit for sending requests for 120 seconds
            cache.set(rate_key, True, timeout=120)

            # Send an email with the verification code
            send_mail(
                subject="کد تایید سیستم",
                message=f"کد تایید شما: {verification_code}\nاین کد به مدت ۲ دقیقه معتبر است.\nفروشگاه دوربین شهر",
                from_email=EMAIL_HOST_USER,
                recipient_list=[email],
            )

            return Response(
                {"message": "یک کد ۵ رقمی به ایمیل شما ارسال شد."},
                status=status.HTTP_200_OK,
            )

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetEmailVerificationCodeView(APIView):
    def post(self, request):
        serializer = PasswordResetEmailVerificationCodeSerializer(data=request.data)

        if serializer.is_valid():
            entered_email = serializer.validated_data["email"]
            entered_verification_code = serializer.validated_data["verification_code"]

            cached_verification_code = cache.get(
                f"email_verification_code:{entered_email}"
            )

            if cached_verification_code is None:
                return Response(
                    {"error": "کد تایید منقضی شده است."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if cached_verification_code != entered_verification_code:
                return Response(
                    {"error": "کد تایید اشتباه است."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            cache.delete(entered_email)

            # Store a flag in the cache indicating the email is verified, valid for 15 minutes
            cache.set(f"email_verified:{entered_email}", True, timeout=900)

            return Response(
                {"message": "کد با موفقیت تایید شد."},
                status=status.HTTP_200_OK,
            )


class PasswordResetView(APIView):
    def post(self, request):
        serializer = PasswordResetSeializer(data=request.data)

        if serializer.is_valid():
            user_data = serializer.validated_data
            if cache.get(f"email_verified:{user_data["email"]}"):
                user = User.objects.get(email=user_data["email"])
                user.set_password(user_data["new_password"])
                user.save()
                cache.delete(f"email_verified:{user_data["email"]}")
                return Response(
                    {"message": "رمزعبور با موفقیت تغییر یافت."},
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {
                        "error": "ایمیل شما تایید نشده است یا مدت اعتبار آن به پایان رسیده است."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
