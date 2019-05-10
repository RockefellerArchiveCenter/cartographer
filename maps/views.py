from django.http import QueryDict
from django.urls import reverse, reverse_lazy
from django.views.generic import TemplateView, CreateView, DeleteView, DetailView, ListView, UpdateView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ReadOnlyModelViewSet

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

    def get_context_data(self):
        context = super(MapsUpdateView, self).get_context_data()
        context['component_form'] = ArrangementMapComponentForm
        return context

    def get_success_url(self):
        return reverse('app:map-detail', kwargs={'pk': self.object.pk})


class ComponentsNewView(APIView):
    def post(self, request, format=None):
        if request.is_ajax():
            try:
                form_data = QueryDict(request.body)
                ArrangementMapComponent.objects.create(
                    title=form_data.get('title'),
                    archivesspace_uri=form_data.get('archivesspace_uri'),
                    parent=ArrangementMapComponent.objects.get(pk=form_data.get('parent')) if form_data.get('parent') else None,
                    map=ArrangementMap.objects.get(pk=form_data.get('map')))
                return Response({"detail": "Component saved."}, status=200)
            except Exception as e:
                return Response({"detail": str(e)}, status=500)
        else:
            return Response({"detail": "Request must be AJAX"}, status=500)


class ArrangementMapViewset(ReadOnlyModelViewSet):
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
