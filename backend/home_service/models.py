from django.db import models
from django.contrib.auth.models import User
from autoslug import AutoSlugField

class Service(models.Model):
    slug = AutoSlugField(primary_key=True, populate_from=("name"))
    email = models.EmailField()
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    image = models.ImageField(upload_to="images/")
    description = models.TextField()
    type_of_service = models.CharField(max_length=100)
    rating = models.DecimalField(default=0, max_digits=2, decimal_places=1)
    user = models.ManyToManyField(User, related_name="services", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} {self.type_of_service}"


class Address(models.Model):
    address_line_1 = models.TextField()
    address_line_2 = models.TextField(null=True, blank=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pin_code = models.CharField(max_length=10)
    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="addresses",
    )
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, null=True, blank=True, related_name="address"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        if self.service is not None:
            return str(self.service)
        return str(self.user)
