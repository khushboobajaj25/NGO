from rest_framework import serializers
from home_service import models
from django.contrib.auth.models import User


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Address
        fields = "__all__"


class ServiceSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True)

    class Meta:
        model = models.Service
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    def create(self, validated_data):
        user = User(**validated_data, is_superuser=True, is_staff=True)
        user.email = user.username
        user.set_password(validated_data["password"])
        user.save()
        return user

    class Meta:
        model = User
        fields = "__all__"
