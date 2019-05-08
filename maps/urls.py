from django.urls import path, re_path
from .views import HomeView, MapsDeleteView, MapsDetailView, MapsListView, MapsNewView, MapsUpdateView

app_name = 'app'
urlpatterns = [
    path('maps', MapsListView.as_view(), name='map-list'),
    re_path('maps/(?P<pk>\d+)$', MapsDetailView.as_view(), name='map-detail'),
    re_path('maps/(?P<pk>\d+)/delete/', MapsDeleteView.as_view(), name='map-delete'),
    re_path('maps/(?P<pk>\d+)/update/', MapsUpdateView.as_view(), name='map-update'),
    path('new', MapsNewView.as_view(), name='map-new'),
    path('', HomeView.as_view(), name='map-home'),
]
