from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser


# Create your views here.
@csrf_exempt
def post_list(request):
    if request.method == 'GET':
        snippets = Post.objects.all()
        serializer = PostSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = PostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def post_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        snippet = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = PostSerializer(snippet)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = PostSerializer(snippet, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        snippet.delete()
        return HttpResponse(status=204)


class AccountView(APIView):
    serializer_class = AccountSerializer

    def get(self, request):
        body = [
            {"first_name": body.first_name, "last_name": body.last_name, "email": body.email, "username": body.username,
             "password": body.password}
            for body in Account.objects.all()]
        return Response(body)

    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class CommentView(APIView):
    serializer_class = CommentSerializer

    def get(self, request):
        body = [{"author": body.author, "body": body.body, "created_on": body.created_on, "post": body.post}
                for body in Comment.objects.all()]
        return Response(body)

    def post(self, request):
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

# Create your views here.
