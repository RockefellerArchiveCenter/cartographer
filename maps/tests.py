import random
import string

from django.test import TestCase, Client
from django.urls import reverse
from rest_framework.test import APIRequestFactory

from .models import ArrangementMap, ArrangementMapComponent, DeletedArrangementMap
from .views import ArrangementMapViewset, ArrangementMapComponentViewset


def get_title_string(length=10):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(10))


class CartographerTest(TestCase):
    def setUp(self):
        self.map_number = random.randint(2, 10)
        self.component_number = random.randint(2, 20)
        self.client = Client()
        self.factory = APIRequestFactory()

    def create_maps(self):
        for i in range(self.map_number):
            map = ArrangementMap.objects.create(title=get_title_string())
            self.assertEqual(map.publish, False, "Map was accidentally published")
        self.assertEqual(len(ArrangementMap.objects.all()), self.map_number, "Wrong number of instances created")

    def publish_maps(self):
        map = random.choice(ArrangementMap.objects.all())
        for action in [('publish', True), ('unpublish', False)]:
            response = self.client.get(reverse('app:map-publish', kwargs={'pk': map.pk}),
                                       {'action': action[0]}, HTTP_X_REQUESTED_WITH='XMLHttpRequest')
            map.refresh_from_db()
            self.assertEqual(response.status_code, 200, "Wrong HTTP response code")
            self.assertEqual(map.publish, action[1], "Publish was not set on instance")

    def edit_maps(self):
        map = random.choice(ArrangementMap.objects.all())
        map.title = get_title_string(20)
        map.save()
        map.refresh_from_db()
        self.assertEqual(len(ArrangementMap.objects.all()), self.map_number, "Edit created a new instance")
        self.assertTrue(map.created < map.modified, "Modified time was not updated")

    def delete_maps(self):
        delete_number = random.randint(1, self.map_number-1)
        for i in range(delete_number):
            map = random.choice(ArrangementMap.objects.all())
            map.delete()
        self.assertEqual(len(ArrangementMap.objects.all()), self.map_number-delete_number, "Wrong number of instances deleted")
        self.assertEqual(len(DeletedArrangementMap.objects.all()), delete_number, "DeletedArrangementMap objects were not created on delete")

    def create_components(self):
        map = random.choice(ArrangementMap.objects.all())
        for i in range(self.component_number):
            parent = random.choice(ArrangementMapComponent.objects.all()).pk if len(ArrangementMapComponent.objects.all()) else ""
            response = self.client.get(reverse('app:component-ajax'),
                                       {'action': 'create', 'title': get_title_string(20),
                                        'map': map.pk, 'archivesspace_uri': get_title_string(10),
                                        'parent': parent},
                                       HTTP_X_REQUESTED_WITH='XMLHttpRequest')
            self.assertEqual(response.status_code, 200, "Wrong HTTP response code")
        self.assertEqual(len(ArrangementMapComponent.objects.all()), self.component_number, "Wrong number of instances created")
        self.assertTrue(map.created < map.modified, "Modified time was not updated")

    def edit_components(self):
        component = random.choice(ArrangementMapComponent.objects.all())
        response = self.client.get(reverse('app:component-ajax'),
                                   {'action': 'update', 'title': get_title_string(15),
                                    'archivesspace_uri': get_title_string(5), 'object': component.pk},
                                   HTTP_X_REQUESTED_WITH='XMLHttpRequest')
        self.assertEqual(response.status_code, 200, "Wrong HTTP response code")
        component.refresh_from_db()
        self.assertEqual(len(ArrangementMapComponent.objects.all()), self.component_number, "Edit created a new instance")
        self.assertTrue(component.created < component.modified, "Modified time was not updated")

    def delete_components(self):
        component = random.choice(ArrangementMapComponent.objects.all())
        delete_number = component.get_descendant_count() + 1
        response = self.client.get(reverse('app:component-ajax'),
                                   {'action': 'delete', 'object': component.pk},
                                   HTTP_X_REQUESTED_WITH='XMLHttpRequest')
        self.assertEqual(response.status_code, 200, "Wrong HTTP response code")
        self.assertEqual(len(ArrangementMapComponent.objects.all()), self.component_number - delete_number, "Wrong number of objects deleted")
        self.assertTrue(component.map.created < component.map.modified, "Modified time was not updated")

    def api_list_views(self):
        for view in [('arrangementmap-list', ArrangementMapViewset), ('arrangementmapcomponent-list', ArrangementMapComponentViewset)]:
            request = self.factory.get(reverse(view[0]), format="json")
            response = view[1].as_view(actions={"get": "list"})(request)
            self.assertEqual(response.status_code, 200, "Wrong HTTP status code")
        request = self.factory.get('{}?modified_since={}'.format(reverse('arrangementmap-list'), random.randint(1500000000, 2500000000)), format="json")
        response = ArrangementMapViewset.as_view(actions={"get": "list"})(request)
        self.assertEqual(response.status_code, 200, "Wrong HTTP status code")

    def api_detail_views(self):
        obj = random.choice(ArrangementMap.objects.all())
        request = self.factory.get(reverse('arrangementmap-detail', kwargs={"pk": obj.pk}), format="json")
        response = ArrangementMapViewset.as_view(actions={"get": "retrieve"})(request, pk=obj.pk)
        self.assertEqual(response.status_code, 200, "Wrong HTTP status code")

    def delete_feed_view(self):
        response = self.client.get(reverse('delete-feed'), format="json")
        self.assertEqual(response.status_code, 200, "Wrong HTTP status code")
        self.assertTrue(response.data['count'] > 0, "No deleted instances")
        time_response = self.client.get('{}?deleted_since={}'.format(reverse('delete-feed'), random.randint(1500000000, 2500000000)), format="json")
        self.assertEqual(time_response.status_code, 200, "Wrong HTTP status code")

    def schema(self):
        schema = self.client.get(reverse('schema-json', kwargs={"format": ".json"}))
        self.assertEqual(schema.status_code, 200, "Wrong HTTP code")

    def test_maps(self):
        self.create_maps()
        self.publish_maps()
        self.edit_maps()
        self.delete_maps()
        self.create_components()
        self.edit_components()
        self.api_list_views()
        self.api_detail_views()
        self.delete_components()
        self.delete_feed_view()
        self.schema()
