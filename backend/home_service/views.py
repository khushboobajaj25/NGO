from django.shortcuts import render
from home_service import serializers
from rest_framework import generics
from home_service import models
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import EmailMultiAlternatives
from rest_framework import views
from rest_framework.response import Response
from rest_framework import permissions, authentication


class HomeView(generics.ListAPIView):
    queryset = models.Service.objects.all()
    serializer_class = serializers.ServiceSerializer


class ServiceAPI(generics.RetrieveAPIView):
    queryset = models.Service.objects.all()
    serializer_class = serializers.ServiceSerializer
    lookup_field = "slug"


class RegisterUserAPI(generics.CreateAPIView):
    serializer_class = serializers.UserSerializer
    queryset = models.User.objects.all()


class AddressAPI(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)
    serializer_class = serializers.AddressSerializer
    queryset = models.Address.objects.all()


class BookAppointmentAPI(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)

    def post(self, request):
        service = models.Service.objects.get(pk=request.data["slug"])
        service.user.add(request.user)
        context = {
            "user": request.user,
            "service": service,
            "service_otp": otp_generator(),
            "user_otp": otp_generator(),
        }
        # send_email(request.user.email,context)
        # send_email(service.email,context)
        return Response()


def send_email(email, template_name, context):
    html_content = render_to_string(template_name, context)
    text_content = strip_tags(html_content)
    email = EmailMultiAlternatives(
        subject="This is the confirmation email from Home Service on Demand",
        body=text_content,
        from_email=settings.EMAIL_HOST_USER,
        to=[email],
    )
    email.attach_alternative(html_content, "text/html")
    email.send()


def otp_generator():
    import random

    return random.randint(1000, 9999)


class EmailView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)

    def post(self, request):
        service_email = request.data["service_email"]
        send_email(service_email, "email/email.html", {"otp": otp_generator()})
        return Response()


class AppointmentAPI(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)
    queryset = models.Service.objects.all()
    serializer_class = serializers.ServiceSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user).order_by("-created_at")

