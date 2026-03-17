from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Item, Category, Cart, CartItem
from .serializers import ItemSerializer, CategorySerializer, CartSerializer, CartItemSerializer

@api_view(['GET'])
def get_items(request):
    items = Item.objects.all()
    serializer =ItemSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_item(request, pk):
    try:
        product = Item.objects.get(id=pk)
        serializer = ItemSerializer(product, context = {'request': request})
        return Response(serializer.data)
    except:
        return Response({'error':'Product not found!'}, status=404)

@api_view(['GET'])
def get_categories(request):
    categories = Category.objects.all()
    serializer =CategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_cart(request):
    cart, created = Cart.objects.get_or_create(user=None)
    serializer = CartSerializer(cart)
    return Response(serializer.data)

@api_view(['POST'])
def add_to_cart(request):
    product_id= request.data.get('product_id')
    product = Item.objects.get(id=product_id)
    cart, created = Cart.objects.get_or_create(user=None)
    item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        item.quantity += 1
        item.save()
    serializer = CartSerializer(cart)
    return Response({'message': 'Item added to cart', 'cart': serializer.data})

@api_view(['POST'])
def remove_from_cart(request):
    item_id = request.data.get('item_id')
    CartItem.objects.filter(id=item_id).delete()
    return Response({'message':'Item deleted successfully'})