from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from authentication.authentication import CookieJWTAuthentication
from .serializers import CartSerializer, CartItemSerializer
from cart.services.cart_service import CartService


class CartViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

    def get_cart_service(self):
        return CartService(self.request.user)

    def list(self, request):
        """
        GET /cart/  → Display the current user's cart
        """
        cart = self.get_cart_service().cart
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def create(self, request):
        """
        POST /cart/  → Add an item to the cart
        """
        product_id = request.data["product_id"]
        quantity = int(request.data.get("quantity", 1))

        cart = self.get_cart_service()
        cart.add_item(product_id, quantity)

        serializer = CartSerializer(cart.cart)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        """
        PUT /cart/{product_id}/  → Update the quantity of a specific item
        """
        quantity = request.data["quantity"]
        cart = self.get_cart_service()
        cart.update_item(product_id=pk, quantity=quantity)

        serializer = CartSerializer(cart.cart)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        """
        DELETE /cart/{product_id}/  → Remove a specific item from the cart
        """
        cart = self.get_cart_service()
        cart.remove_item(product_id=pk)

        serializer = CartSerializer(cart.cart)
        return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=["post"])
    def clear(self, request):
        """
        POST /cart/clear/  → Clear the entire cart
        """
        cart = self.get_cart_service()
        cart.clear_cart()
        serializer = CartSerializer(cart.cart)
        return Response(serializer.data)
