from .models import User
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegularCustomerRegistrationSerializer


class RegularCustomerRegistrationView(APIView):
    def post(self, request):
        serializer = RegularCustomerRegistrationSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            refresh_token = RefreshToken.for_user(user)
            return Response(
                {
                    "message": "ثبت نام با موفقیت انجام شد.",
                    "refresh_token": str(refresh_token),
                    "access_token": str(refresh_token.access_token),
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
