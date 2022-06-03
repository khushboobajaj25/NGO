from django.urls import path,include
from home_service import views
from rest_framework.authtoken.views import obtain_auth_token
urlpatterns = [
   path("user/auth/",obtain_auth_token),
   path('', views.HomeView.as_view(), name='home'),
   path('user/register/',views.RegisterUserAPI.as_view(),name='register'),
   path('service/<str:slug>/', views.ServiceAPI.as_view(), name='service'),
   path('book/', views.BookAppointmentAPI.as_view(), name='book'),

]