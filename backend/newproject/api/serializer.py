from rest_framework import serializers
from .models import book

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = book
        fields = '__all__'