from django.contrib import admin
from home_service import models
@admin.register(models.Service)
class AdminService(admin.ModelAdmin):
    list_display=["slug",]
admin.site.register(models.Address)
