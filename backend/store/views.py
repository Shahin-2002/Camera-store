from .models import Category, Product
from rest_framework.views import APIView
from .serializers import CategorySerializer, ProductSerializer
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAdminUser
from authentication.authentication import CookieJWTAuthentication
from .filters import ProductFilter
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend


class CategoryTreeView(APIView):
    def get(self, request):
        root_nodes = Category.objects.root_nodes()
        serializer = CategorySerializer(root_nodes, many=True)
        return Response(serializer.data)


class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    authentication_classes = [CookieJWTAuthentication]
    filterset_class = ProductFilter
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    search_fields = ["name"]
    ordering_fields = ["new_price", "created_at"]

    def get_permissions(self):
        self.permission_classes = [AllowAny]

        if self.request.method == "POST":
            self.permission_classes = [IsAdminUser]

        return super().get_permissions()

    def get_queryset(self):
        queryset = super().get_queryset()
        category_slug = self.request.query_params.get("category")
        if category_slug:
            try:
                category = Category.objects.get(slug=category_slug)
                descendants = category.get_descendants(include_self=True)
                queryset = queryset.filter(category__in=descendants)
            except Category.DoesNotExist:
                queryset = queryset.none()
        return queryset


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    authentication_classes = [CookieJWTAuthentication]

    def get_permissions(self):
        self.permission_classes = [AllowAny]

        if self.request.method in ["PUT", "PATCH", "DELETE"]:
            self.permission_classes = [IsAdminUser]

        return super().get_permissions()


class LatestProductsView(generics.ListAPIView):
    queryset = Product.objects.all().order_by("-created_at")[:10]
    serializer_class = ProductSerializer
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [AllowAny]
