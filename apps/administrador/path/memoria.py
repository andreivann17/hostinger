from django.urls import path
from ..views import memoria
urlpatterns = [

    path('memoria/', memoria.Memoria.as_view()),
]
	
	