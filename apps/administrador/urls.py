from .path import (generos,tipo_contrato,empleados,departamentos,usuarios,ajustes,divisas,logos,memoria,login,puestos)
urlpatterns = []
urlpatterns += generos.urlpatterns
urlpatterns += tipo_contrato.urlpatterns
urlpatterns += puestos.urlpatterns
urlpatterns += empleados.urlpatterns
urlpatterns += departamentos.urlpatterns
urlpatterns += usuarios.urlpatterns
urlpatterns += ajustes.urlpatterns
urlpatterns += divisas.urlpatterns
urlpatterns += logos.urlpatterns
urlpatterns += login.urlpatterns
urlpatterns += memoria.urlpatterns