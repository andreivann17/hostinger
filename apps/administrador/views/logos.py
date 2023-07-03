from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from channels.layers import get_channel_layer
from ..static.python.utils import registros as registros_util, token_auth
channel_layer = get_channel_layer()
from ipware import get_client_ip
from ..static.python.movimientos import movimientos
from ..static.python.logos import (
 
    logos,
   
)

class Logos(APIView):
    authentication_classes = ()
    permission_classes = ()
    def post(self, request):
        token = request.data.get("token")
        data_auth = token_auth.token_auth(token)
        if len(data_auth )>0 and token:
            data = logos.get_info(request.data.get("clave"))   
            return Response({ "data": data },status=status.HTTP_200_OK)
        return Response({},status=status.HTTP_403_FORBIDDEN)
    def patch(self, request):
        data = []
        client_ip, is_routable = get_client_ip(request)
        token = request.data.get("token")
        data_auth = token_auth.token_auth(token)

        if len(data_auth )>0 and token:
           
            data_info = request.data.get("data")
            
            logos.editando(request.data.get("data"))
            movimientos.agregando("11",client_ip,data[0],data_auth['usuarioID'])
            if str(request.data.get("clave") )== str(data_info[0]):
                data.append(False)
            else:
                data.append(data_info[0])
            return Response({  "data": data,  "msg":"Se ha agregado correctamente",  },status=status.HTTP_200_OK)
           
           
               
    
        return Response({ },status=status.HTTP_403_FORBIDDEN)
