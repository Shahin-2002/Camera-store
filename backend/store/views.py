from .models import Category
from rest_framework.views import APIView
from .serializers import CategorySerializer
from rest_framework.response import Response


class CategoryTreeView(APIView):
    def get(self, request):
        root_nodes = Category.objects.root_nodes()
        serializer = CategorySerializer(root_nodes, many=True)
        return Response(serializer.data)
