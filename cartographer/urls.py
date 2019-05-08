from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework import routers
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from maps.views import ArrangementMapViewset

router = routers.DefaultRouter()
router.register(r'maps', ArrangementMapViewset, 'map')
schema_view = get_schema_view(
   openapi.Info(
      title="Cartographer API",
      default_version='v1',
      description="API for Cartographer, an application to create and manage arrangement maps",
      contact=openapi.Contact(email="archive@rockarch.org"),
      license=openapi.License(name="MIT License"),
   ),
   validators=['flex', 'ssv'],
   public=False,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('status/', include('health_check.api.urls')),
    re_path(r'^schema(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=None), name='schema-json'),
    path('api/', include(router.urls)),
    path('', include('maps.urls')),
]
