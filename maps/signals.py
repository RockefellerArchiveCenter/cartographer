from django.db.models.signals import pre_delete
from django.dispatch import receiver

from .models import ArrangementMap, DeletedArrangementMap


@receiver(pre_delete, sender=ArrangementMap)
def create_deleted_map(sender, instance, **kwargs):
    DeletedArrangementMap.objects.create(
        primary_key=instance.pk
    )
