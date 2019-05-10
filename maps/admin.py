from django.contrib import admin
from .models import ArrangementMap


@admin.register(ArrangementMap)
class ArrangementMapAdmin(admin.ModelAdmin):
    pass
