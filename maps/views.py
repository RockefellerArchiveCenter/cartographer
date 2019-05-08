from django.urls import reverse, reverse_lazy
from django.views.generic import TemplateView, CreateView, DeleteView, DetailView, ListView
from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import ArrangementMap
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
    fields = ('title',)

    def get_success_url(self):
        return reverse('app:map-detail', kwargs={'pk': self.object.pk})


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
