from django.urls import path
from ..views import divisas
urlpatterns = [

    path('divisas/', divisas.Divisas.as_view()),
]
	
	