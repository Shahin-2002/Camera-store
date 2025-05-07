from .models import Category, Product
from rest_framework.views import APIView
from .serializers import CategorySerializer, ProductSerializer
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAdminUser
from authentication.authentication import CookieJWTAuthentication


class CategoryTreeView(APIView):
    def get(self, request):
        root_nodes = Category.objects.root_nodes()
        serializer = CategorySerializer(root_nodes, many=True)
        return Response(serializer.data)


class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    authentication_classes = [CookieJWTAuthentication]

    def get_permissions(self):
        self.permission_classes = [AllowAny]

        if self.request.method == "POST":
            self.permission_classes = [IsAdminUser]

        return super().get_permissions()


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    authentication_classes = [CookieJWTAuthentication]

    def get_permissions(self):
        self.permission_classes = [AllowAny]

        if self.request.method in ["PUT", "PATCH", "DELETE"]:
            self.permission_classes = [IsAdminUser]

        return super().get_permissions()
