from django.db import models


class ArrangementMap(models.Model):
    title = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)


class ArrangementMapComponent(models.Model):
    title = models.CharField(max_length=255, null=True, blank=True)
    archivesspace_uri = models.CharField(max_length=255, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
