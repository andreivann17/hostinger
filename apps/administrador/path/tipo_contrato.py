from django.urls import path
from ..views import tipo_contrato 
urlpatterns = [

    path('contrato/', tipo_contrato.tipoContrato.as_view()),
    path('contrato/form/', tipo_contrato.tipoContratoForm.as_view()),
    path('contrato/cards/', tipo_contrato.tipoContratoCards.as_view()),
    path('contrato/registros/', tipo_contrato.tipoContratoRegistros.as_view()),
    path('contrato/dashboard/', tipo_contrato.tipoContratoDashboard.as_view()),
    path('contrato/general/', tipo_contrato.tipoContratoGeneral.as_view()),
]