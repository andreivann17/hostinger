from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from channels.layers import get_channel_layer
from ipware import get_client_ip
from ..static.python.utils import registros as registro_util, token_auth,correo
channel_layer = get_channel_layer()
from ..static.python.movimientos import (
    movimientos 
)
from ..static.python.usuarios import (
    auth 
)
from ..static.python.empleados import (
    
    dashboard ,
    general ,
    registros ,

)
class Login(APIView):
    permission_classes = ()
    authentication_classes = ()
    
    def post(self, request):
        client_ip, is_routable = get_client_ip(request)
        data = []
        if request.data.get("opcion")=="CORREO":              
            data = correo.comprobar_correo(request.data.get("correo"))
        elif request.data.get("opcion")=="CODIGO":
            data = correo.comprobarcode(request.data.get("code"),request.data.get("clave"))
        elif request.data.get("opcion")=="NEWPASSWORD":
            data = auth.newpassword(request.data.get("clave"),request.data.get("pass"))
        elif request.data.get("opcion")=="LOGIN":              
            data =  auth.login(request.data.get("nombre"),request.data.get("pass"))
            if data["status"]=="1":
                request.session['0']  = data["value"]
                movimientos.agregando("66",client_ip,data["value"],data["value"]) 
        
        return Response({
                    "data": data
                },status=status.HTTP_200_OK)