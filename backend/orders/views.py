from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from authentication.authentication import CookieJWTAuthentication
from .models import Order, OrderItem
from cart.models import Cart, CartItem
from store.models import Product
from .serializers import OrderSerializer
from cart.services.cart_service import CartService


class OrderView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        cart_service = CartService(request.user)
        if not cart_service.get_items():
            return Response(
                {"error": "سبد خرید خالی است"}, status=status.HTTP_400_BAD_REQUEST
            )

        data = {
            key: value if isinstance(value, str) else value[0]
            for key, value in request.data.items()
        }
        serializer = OrderSerializer(data=data, context={"request": request})

        if serializer.is_valid():
            order = serializer.save()
            cart_service.clear_cart()
            return Response(
                {"message": "سفارش با موفقیت ثبت شد", "order_id": order.order_id},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
