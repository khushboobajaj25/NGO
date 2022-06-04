from django.urls import path
from home_service import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path("user/auth/", obtain_auth_token),
    path("services/", views.HomeView.as_view(), name="home"),
    path("user/register/", views.RegisterUserAPI.as_view(), name="register"),
    path("services/<str:slug>/", views.ServiceAPI.as_view(), name="service"),
    path("book/", views.BookAppointmentAPI.as_view(), name="book"),
    path('appointments/', views.AppointmentAPI.as_view(), name="app")
]
