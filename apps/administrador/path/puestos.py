from django.urls import path
from ..views import puestos 
urlpatterns = [

    path('puestos/', puestos.Puestos.as_view()),
    path('puestos/form/', puestos.PuestosForm.as_view()),
    path('puestos/cards/', puestos.PuestosCards.as_view()),
    path('puestos/registros/', puestos.PuestosRegistros.as_view()),
    path('puestos/dashboard/', puestos.PuestosDashboard.as_view()),
    path('puestos/general/', puestos.PuestosGeneral.as_view()),
]