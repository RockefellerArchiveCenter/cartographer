from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from .models import ArrangementMap
from .serializers import ArrangementMapSerializer, ArrangementMapListSerializer


class ArrangementMapViewset(ModelViewSet):
    """
    retrieve:
    Return data about a Collection, identified by a primary key.

    list:
    Return paginated data about all Collections.
    """
    model = ArrangementMap
    queryset = ArrangementMap.objects.all().order_by('-modified')

    def get_serializer_class(self):
        if self.action == 'list':
            return ArrangementMapListSerializer
        return ArrangementMapSerializer
