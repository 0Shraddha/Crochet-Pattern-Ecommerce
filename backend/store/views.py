from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Item, Category
from .serializers import ItemSerializer, CategorySerializer

@api_view(['GET'])
def get_items(request):
    items = Item.objects.all()
    serializer =ItemSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_categories(request):
    categories = Category.objects.all()
    serializer =CategorySerializer(categories, many=True)
    return Response(serializer.data)