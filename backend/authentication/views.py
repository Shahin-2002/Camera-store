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
                    key=name, value=token, httponly=True, secure=False, samesite="Lax"
                )
            return response
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
