from django.urls import path
from ..views import generos 
urlpatterns = [

    path('generos/', generos.Generos.as_view()),
    path('generos/form/', generos.GenerosForm.as_view()),
    path('generos/cards/', generos.GenerosCards.as_view()),
    path('generos/registros/', generos.GenerosRegistros.as_view()),
    path('generos/dashboard/', generos.GenerosDashboard.as_view()),
    path('generos/general/', generos.GenerosGeneral.as_view()),
]