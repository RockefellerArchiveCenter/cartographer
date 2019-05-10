from django.urls import path, re_path
from .views import *

app_name = 'app'
urlpatterns = [
    path('maps', MapsListView.as_view(), name='map-list'),
    re_path('maps/(?P<pk>\d+)$', MapsDetailView.as_view(), name='map-detail'),
    re_path('maps/(?P<pk>\d+)/delete/', MapsDeleteView.as_view(), name='map-delete'),
    re_path('maps/(?P<pk>\d+)/update/', MapsUpdateView.as_view(), name='map-update'),
    re_path('maps/(?P<pk>\d+)/publish/', MapsPublishView.as_view(), name='map-publish'),
    path('new', MapsNewView.as_view(), name='map-new'),
    path('components/actions/', ComponentsAJAXView.as_view(), name='component-ajax'),
    path('', HomeView.as_view(), name='map-home'),
]
