from django.urls import path
from ..views import empleados 
urlpatterns = [

    path('empleados/', empleados.Empleados.as_view()),
    path('empleados/form/', empleados.EmpleadosForm.as_view()),
    path('empleados/privilegios/', empleados.EmpleadosForm.as_view()),
    path('empleados/cards/', empleados.EmpleadosCards.as_view()),
    path('empleados/registros/', empleados.EmpleadosRegistros.as_view()),
    path('empleados/dashboard/', empleados.EmpleadosDashboard.as_view()),
    path('empleados/general/', empleados.EmpleadosGeneral.as_view()),
]