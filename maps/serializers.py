from rest_framework import serializers
from .models import ArrangementMap, ArrangementMapComponent


class ArrangementMapSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ArrangementMap
        fields = '__all__'


class ArrangementMapListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ArrangementMap
        fields = ('url', 'title',)
