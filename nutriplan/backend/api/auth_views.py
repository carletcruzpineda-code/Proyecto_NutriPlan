from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response

from .serializers import LoginSerializer, UsuarioSerializer


class LoginView(TokenObtainPairView):
    """
    Login con JWT usando el campo 'correo' (configurado en LoginSerializer).
    Devuelve:
      - refresh
      - access
      - usuario: datos del usuario (por UsuarioSerializer)
    """
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]


class MeView(APIView):
    """
    Devuelve los datos completos del usuario autenticado a partir del token:
      - id
      - correo
      - nombre
      - edad
      - peso
      - altura
      - objetivo
      - genero
      - etc. (lo que define UsuarioSerializer)
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        data = UsuarioSerializer(user).data
        return Response(data)
