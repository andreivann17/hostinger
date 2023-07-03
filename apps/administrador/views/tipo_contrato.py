from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from channels.layers import get_channel_layer
from ipware import get_client_ip
from ..static.python.utils import registros as registro_util, token_auth
channel_layer = get_channel_layer()
from ..static.python.movimientos import (
    movimientos 
)
from ..static.python.tipo_contrato import (
    
    dashboard ,
    general ,
    registros ,
    tipo_contrato , 
   
)

class tipoContrato(APIView):
    authentication_classes = ()
    permission_classes = ()
    def post(self, request):
        token = request.data.get("token")
        data_auth = token_auth.token_auth(token)
        if len(data_auth )>0 and token:
            data = tipo_contrato.get_info(request.data.get("clave"))   
            return Response({"data": data},status=status.HTTP_200_OK)
        return Response({},status=status.HTTP_403_FORBIDDEN)
class tipoContratoCards(APIView):   
    authentication_classes = ()
    permission_classes = ()
    def post(self, request):
        token = request.data.get("token")
        data_auth = token_auth.token_auth(token)
        if len(data_auth )>0 and token:
            data = registro_util.cards(request.data.get("buscador"),request.data.get("limit"),request.data.get("value"),"tipo_contrato","tipo_contratoID","nombre")     
            return Response({ "data": data},status=status.HTTP_200_OK)
        return Response({},status=status.HTTP_403_FORBIDDEN)    
class tipoContratoDashboard(APIView):
    permission_classes = ()
    authentication_classes = ()
    def post(self, request):
        data = []
        token = request.data.get("token")
        data_auth = token_auth.token_auth(token)
        if len(data_auth )>0 and token:
            data = dashboard.dashboard(request.data.get("fecha"),request.data.get("clave"))   
            return Response({
                        "data":data},status=status.HTTP_200_OK)
        return Response({},status=status.HTTP_403_FORBIDDEN)      
class tipoContratoGeneral(APIView):
    permission_classes = ()
    authentication_classes = ()
    def post(self, request):
        token = request.data.get("token")
        data_auth = token_auth.token_auth(token)
        if len(data_auth )>0 and token:
            data = general.get_info(request.data.get("clave"))
            return Response({ "data": data},status=status.HTTP_200_OK)  
        return Response({},status=status.HTTP_403_FORBIDDEN)  
class tipoContratoRegistros(APIView):
    permission_classes = ()
    authentication_classes = ()
    def post(self, request):
        token = request.data.get("token")
        data_auth = token_auth.token_auth(token)
        if len(data_auth )>0 and token:
            data = registros.registros(request.data.get("buscador"),request.data.get("limit"),request.data.get("value"),request.data.get("fecha"),request.data.get("clave"))
            return Response({ "data": data},status=status.HTTP_200_OK)  
        return Response({},status=status.HTTP_403_FORBIDDEN)  
class tipoContratoForm(APIView):
    permission_classes = ()
    authentication_classes = ()
    def post(self, request):
        client_ip, is_routable = get_client_ip(request)
        token = request.data.get("token")
        data_auth = token_auth.token_auth(token)
        if len(data_auth )>0 and token:
            data = request.data.get("data")
            if registro_util.codigo_existente(data['nombre'],data['nombre'],"tipo_contrato","nombre","AGREGANDO"):
                tipo_contrato.agregando(data,data_auth['usuarioID'])
                movimientos.agregando("8",client_ip,data['nombre'],data_auth['usuarioID'])
                return Response({ "data": data,"msg":"Se ha agregado correctamente"},status=status.HTTP_200_OK)
            return Response({ "data": data,"msg":"Nombre duplicada, ingrese otra nombre",
                },status=status.HTTP_202_ACCEPTED)

      
        return Response({ },status=status.HTTP_403_FORBIDDEN)
    
    def patch(self, request):
        data = []
        client_ip, is_routable = get_client_ip(request)
        token = request.data.get("token")
        data_auth = token_auth.token_auth(token)

        if len(data_auth )>0 and token:
            if request.data.get("opcion")=="EDITANDO":
                data_info = request.data.get("data")
                if registro_util.codigo_existente(request.data.get("nombre"),data_info["nombre"],"tipo_contrato","nombre","EDITANDO"):
                    tipo_contrato.editando(data_info,request.data.get("clave"),data_auth['usuarioID'])
                    movimientos.agregando("11",client_ip,data_info['clave'],data_auth['usuarioID'])
                    if str(request.data.get("clave") )== str(data_info['clave']):
                        data.append(False)
                    else:
                        data.append(data_info[0])
                    return Response({ "data": data,  "msg":"Se ha agregado correctamente"  },status=status.HTTP_200_OK)
                return Response({ "data": data, "msg":"Nombre duplicada, ingrese otra nombre"},status=status.HTTP_202_ACCEPTED)
            
            elif request.data.get("opcion")=="ELIMINANDO":
                data = tipo_contrato.eliminando(request.data.get("clave"))
                movimientos.agregando("14",client_ip,data['clave'],data_auth['usuarioID'])
                return Response({"data": data,  "msg":"Se ha eliminado correctamente"},status=status.HTTP_200_OK)
               
    
        return Response({ },status=status.HTTP_403_FORBIDDEN)   

    
