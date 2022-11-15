from rest_framework import serializers
from .models import *


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'body', 'created_on', 'last_modified']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['author', 'body', 'created_on', 'post']


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['first_name', 'last_name', 'email', 'username', 'password']
