from django.urls import reverse
from rest_framework import serializers
from .models import ArrangementMap, ArrangementMapComponent


class ArrangementMapComponentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ArrangementMapComponent
        fields = ('title',)


class ArrangementMapComponentListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ArrangementMapComponent
        fields = ('url', 'title',)


class ArrangementMapSerializer(serializers.HyperlinkedModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = ArrangementMap
        fields = ('url', 'title', 'children', 'publish', 'created', 'modified')

    def process_tree_item(self, objects, tree):
        for item in objects:
            ref = self.ref(item)
            if item.is_leaf_node():
                tree.append({'title': item.title, 'ref': ref, 'parent': self.ref(item.parent)}
                            if item.parent else {'title': item.title, 'ref': ref})
            else:
                tree.append({'title': item.title, 'ref': ref, 'parent': self.ref(item.parent), 'children': []}
                            if item.parent else {'title': item.title, 'ref': ref, 'children': []})
                self.process_tree_item(item.children.all(), tree[-1].get('children'))
        return tree

    def get_children(self, obj):
        if len(obj.components.all()):
            self.tree = []
            self.process_tree_item(obj.components.filter(parent__isnull=True).all(), self.tree)
            return self.tree

    def ref(self, obj):
        return reverse('arrangementmapcomponent-detail', kwargs={'pk': obj.pk})


class ArrangementMapListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ArrangementMap
        fields = ('url', 'title',)
