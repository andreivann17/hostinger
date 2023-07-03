from django.urls import path
from ..views import ajustes
urlpatterns = [

    path('ajustes/', ajustes.Ajustes.as_view()),
]
  