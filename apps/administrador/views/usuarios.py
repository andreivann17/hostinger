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
from ..static.python.usuarios import (
    
    dashboard ,
    general ,
    registros ,
    usuarios , 
    privilegios,
)

class Usuarios(APIView):
    authentication_classes = ()
    permission_classes = ()
    def post(self, request):
        token = request.data.get("token")
        data_auth = token_auth.token_auth(token)
        if len(data_auth )>0 and token:
            data = usuarios.get_info(request.data.get("clave"))   
            return Response({"data": data},status=status.HTTP_200_OK)
        return Response({},status=status.HTTP_403_FORBIDDEN)
class UsuariosCards(APIView):   
    authentication_classes = ()
    permission_classes = ()
    def post(self, request):
        token = request.data.get("token")
        data_auth = token_auth.token_auth(token)
        if len(data_auth )>0 and token:
            data = registro_util.cards(request.data.get("buscador"),request.data.get("limit"),request.data.get("value"),"usuarios","clave_usuario","nombre")     
            return Response({ "data": data},status=status.HTTP_200_OK)
        return Response({},status=status.HTTP_403_FORBIDDEN)    
class UsuariosDashboard(APIView):
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
class UsuariosGeneral(APIView):
    permission_classes = ()
    authentication_classes = ()
    def post(self, request):
        token = request.data.get("token")
        data_auth = token_auth.token_auth(token)
        if len(data_auth )>0 and token:
            data = general.get_info(request.data.get("clave"))
            return Response({ "data": data},status=status.HTTP_200_OK)  
        return Response({},status=status.HTTP_403_FORBIDDEN)  
class UsuariosRegistros(APIView):
    permission_classes = ()
    authentication_classes = ()
    def post(self, request):
        token = request.data.get("token")
        data_auth = token_auth.token_auth(token)
        if len(data_auth )>0 and token:
            data = registros.registros(request.data.get("buscador"),request.data.get("limit"),request.data.get("value"),request.data.get("fecha"),request.data.get("clave"))
            return Response({ "data": data},status=status.HTTP_200_OK)  
        return Response({},status=status.HTTP_403_FORBIDDEN)  
class UsuariosForm(APIView):
    permission_classes = ()
    authentication_classes = ()
    def post(self, request):
        client_ip, is_routable = get_client_ip(request)
        token = request.data.get("token")
        data_auth = token_auth.token_auth(token)
        if len(data_auth )>0 and token:
            data = request.data.get("data")
            if registro_util.codigo_existente(data[0],data[0],"productos","clave_producto","AGREGANDO"):
                usuarios.agregando(data,data_auth['usuarioID'],request.data.get("img"))
                movimientos.agregando("8",client_ip,data[0],data_auth['usuarioID'])
                return Response({ "data": data,"msg":"Se ha agregado correctamente"},status=status.HTTP_200_OK)
            return Response({ "data": data,"msg":"Clave duplicada, ingrese otra clave",
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
                if registro_util.codigo_existente(request.data.get("clave"),data_info[0],"productos","clave_producto","EDITANDO"):
                    usuarios.editando(data_info,request.data.get("clave"),data_auth['usuarioID'])
                    movimientos.agregando("11",client_ip,data[0],data_auth['usuarioID'])
                    if str(request.data.get("clave") )== str(data_info[0]):
                        data.append(False)
                    else:
                        data.append(data_info[0])
                    return Response({ "data": data,  "msg":"Se ha agregado correctamente"  },status=status.HTTP_200_OK)
                return Response({ "data": data, "msg":"Clave duplicada, ingrese otra clave"},status=status.HTTP_202_ACCEPTED)
            
            elif request.data.get("opcion")=="ELIMINANDO":
                data = usuarios.eliminando(request.data.get("clave"))
                movimientos.agregando("14",client_ip,data[0],data_auth['usuarioID'])
                return Response({"data": data,  "msg":"Se ha eliminado correctamente"},status=status.HTTP_200_OK)
               
    
        return Response({ },status=status.HTTP_403_FORBIDDEN)   
class UsuariosPrivilegios(APIView):
    permission_classes = ()
    authentication_classes = ()
    def post(self, request):
        client_ip, is_routable = get_client_ip(request)
        token = request.data.get("token")
        data_auth = token_auth.token_auth(token)    
        if len(data_auth )>0 and token:
            data = privilegios.agregando(request.data.get("usuario"),request.data.get("cantidad"),request.data.get("clave"))  
            movimientos.agregando("10",client_ip,data[0],data_auth['usuarioID']) 
            return Response({"data": data, "msg":"Se ha agregado correctamente", },status=status.HTTP_200_OK)
        return Response({},status=status.HTTP_403_FORBIDDEN)
    
    def patch(self, request):
        client_ip, is_routable = get_client_ip(request)
        msg = "TOKEN INVALIDA"
        token = request.data.get("token")
        data_auth = token_auth.token_auth(token)
        if len(data_auth )>0 and token:
            data = privilegios.editando(request.data.get("clave"),request.data.get("usuario"),request.data.get("cantidad"))
            movimientos.agregando("13",client_ip,request.data.get("clave"),data_auth['usuarioID'])
            return Response({"data": data,"msg":msg},status=status.HTTP_200_OK)
        return Response({ },status=status.HTTP_403_FORBIDDEN)
    
