from django.db.models.signals import pre_delete, post_save
from django.dispatch import receiver

from .models import ArrangementMap, ArrangementMapComponent, DeletedArrangementMap


@receiver(pre_delete, sender=ArrangementMap)
def create_deleted_map(sender, instance, **kwargs):
    DeletedArrangementMap.objects.create(
        primary_key=instance.pk
    )


@receiver(post_save, sender=ArrangementMapComponent)
def update_map(sender, instance, **kwargs):
    ArrangementMap.objects.get(components=instance).save()


@receiver(pre_delete, sender=ArrangementMapComponent)
def update_map(sender, instance, **kwargs):
    ArrangementMap.objects.get(components=instance).save()
