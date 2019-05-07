from django.db import models


class ArrangementMap(models.Model):
    title = models.CharField(max_length=255)


class ArrangementMapComponent(models.Model):
    title = models.CharField(max_length=255, null=True, blank=True)
    archivesspace_uri = models.CharField(max_length=255, null=True, blank=True)
