from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from .serializers import PostSerializer, CommentSerializer
from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from .serializers import *


# Create your views here.

class PostView(APIView):
    serializer_class = PostSerializer

    def get(self, request):
        body = [{"title": body.title, "body": body.body, "created_on": body.created_on, "last_modified": body.last_modified, "categories": body.categories}
                  for body in Post.objects.all()]
        return Response(body)

    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

class AccountView(APIView):
    serializer_class = AccountSerializer

    def get(self, request):
        body = [{"first_name": body.first_name, "last_name": body.last_name, "email": body.email, "username": body.username, "password": body.password}
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
