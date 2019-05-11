from django.http import QueryDict
from django.urls import reverse, reverse_lazy
from django.views.generic import TemplateView, CreateView, DeleteView, DetailView, ListView, UpdateView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ReadOnlyModelViewSet

from asnake.aspace import ASpace

from cartographer import settings
from .forms import ArrangementMapForm, ArrangementMapComponentForm
from .models import ArrangementMap, ArrangementMapComponent
from .serializers import ArrangementMapSerializer, ArrangementMapListSerializer


class HomeView(TemplateView):
    template_name = 'maps/homeview.html'

    def get_context_data(self):
        context = super(HomeView, self).get_context_data()
        context['recent_maps'] = ArrangementMap.objects.all().order_by('-modified')
        return context


class MapsDeleteView(DeleteView):
    model = ArrangementMap
    success_url = reverse_lazy('app:map-list')


class MapsDetailView(DetailView):
    model = ArrangementMap


class MapsListView(ListView):
    model = ArrangementMap
    queryset = ArrangementMap.objects.all().order_by('-modified')


class MapsNewView(CreateView):
    model = ArrangementMap
    form_class = ArrangementMapForm

    def get_success_url(self):
        return reverse('app:map-detail', kwargs={'pk': self.object.pk})


class MapsUpdateView(UpdateView):
    model = ArrangementMap
    form_class = ArrangementMapForm

    def get_success_url(self):
        return reverse('app:map-detail', kwargs={'pk': self.object.pk})


class MapsPublishView(APIView):
    def get(self, request, format=None, **kwargs):
        if request.is_ajax():
            try:
                action = request.GET.get('action')
                object = ArrangementMap.objects.get(pk=self.kwargs.get('pk'))
                object.publish = True if action == 'publish' else False
                object.save()
                return Response({"detail": "Component {}ed.".format(action)}, status=200)
            except Exception as e:
                return Response({"detail": str(e)}, status=500)
        else:
            return Response({"detail": "Request must be AJAX"}, status=500)


class ComponentsAJAXView(APIView):
    def get(self, request, format=None, **kwargs):
        if request.is_ajax():
            try:
                action = request.GET.get('action')
                if action == 'create':
                    ArrangementMapComponent.objects.create(
                        title=request.GET.get('title'),
                        archivesspace_uri=request.GET.get('archivesspace_uri'),
                        parent=ArrangementMapComponent.objects.get(pk=request.GET.get('parent')) if request.GET.get('parent') else None,
                        map=ArrangementMap.objects.get(pk=request.GET.get('map')))
                    message = "Component created."
                elif action == 'delete':
                    ArrangementMapComponent.objects.get(pk=request.GET.get('object')).delete()
                    message = "Component deleted."
                elif action == 'update':
                    object = ArrangementMapComponent.objects.get(pk=request.GET.get('object'))
                    object.title = request.GET.get('title')
                    object.archivesspace_uri = request.GET.get('archivesspace_uri')
                    object.save()
                    message = "Component updated."
                elif action == 'get_resource':
                    message = {}
                    message['success'] = False
                    repo = ASpace(baseurl=settings.ASPACE['baseurl'],
                                  user=settings.ASPACE['username'],
                                  password=settings.ASPACE['password']).repositories(settings.ASPACE['repo_id'])
                    resource = repo.resources(request.GET.get('resource_id'))
                    if isinstance(resource, dict):
                        return Response({"detail": resource.get('error')}, status=200)
                    message['title'] = resource.title
                    message['uri'] = resource.uri
                    message['success'] = True
                return Response({"detail": message}, status=200)
            except Exception as e:
                return Response({"detail": str(e)}, status=500)
        else:
            return Response({"detail": "Request must be AJAX"}, status=500)


class ArrangementMapViewset(ReadOnlyModelViewSet):
    """
    retrieve:
    Return data about an Arrangement Map, identified by a primary key.

    list:
    Return paginated data about all Arrangement Maps.
    """
    model = ArrangementMap
    queryset = ArrangementMap.objects.all().order_by('-modified')

    def get_serializer_class(self):
        if self.action == 'list':
            return ArrangementMapListSerializer
        return ArrangementMapSerializer


class ArrangementMapComponentViewset(ReadOnlyModelViewSet):
    """
    retrieve:
    Return data about an Arrangement Map Component, identified by a primary key.

    list:
    Return paginated data about all Arrangement Map Components.
    """
    model = ArrangementMap
    queryset = ArrangementMap.objects.all().order_by('-modified')

    def get_serializer_class(self):
        if self.action == 'list':
            return ArrangementMapComponentListSerializer
        return ArrangementMapComponentSerializer
