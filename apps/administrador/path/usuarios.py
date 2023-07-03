from django.urls import path
from ..views import usuarios 
urlpatterns = [

    path('usuarios/', usuarios.Usuarios.as_view()),
    path('usuarios/form/', usuarios.UsuariosForm.as_view()),
    path('usuarios/privilegios/', usuarios.UsuariosForm.as_view()),
    path('usuarios/cards/', usuarios.UsuariosCards.as_view()),
    path('usuarios/registros/', usuarios.UsuariosRegistros.as_view()),
    path('usuarios/dashboard/', usuarios.UsuariosDashboard.as_view()),
    path('usuarios/general/', usuarios.UsuariosGeneral.as_view()),
]