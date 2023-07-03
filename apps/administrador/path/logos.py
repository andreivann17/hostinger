from django.urls import path
from ..views import logos
urlpatterns = [

    path('logos/', logos.Logos.as_view()),
]
	
	