from django.urls import path
from ..views import departamentos 
urlpatterns = [

    path('departamentos/', departamentos.Departamentos.as_view()),
    path('departamentos/form/', departamentos.DepartamentosForm.as_view()),
    path('departamentos/cards/', departamentos.DepartamentosCards.as_view()),
    path('departamentos/registros/', departamentos.DepartamentosRegistros.as_view()),
    path('departamentos/dashboard/', departamentos.DepartamentosDashboard.as_view()),
    path('departamentos/general/', departamentos.DepartamentosGeneral.as_view()),
]