from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from channels.layers import get_channel_layer
from ..static.python.utils import registros as registros_util, token_auth
channel_layer = get_channel_layer()
from ..static.python.menus import (
 
    menus,
   
)

class Menus(APIView):
    authentication_classes = ()
    permission_classes = ()
    def post(self, request):
        token = request.data.get("token")
        data_auth = token_auth.token_auth(token)
        if len(data_auth )>0 and token:
            data = []
            if request.data.get("opcion")=="BOTONES":
                data = menus.get_info()
                return Response({"data": data},status=status.HTTP_200_OK)
        return Response({},status=status.HTTP_403_FORBIDDEN)
