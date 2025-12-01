# backend/api/auth_views.py

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response

from .serializers import LoginSerializer


class LoginView(TokenObtainPairView):
    """
    Login con JWT usando el campo 'correo' (configurado en LoginSerializer).
    Devuelve:
      - refresh
      - access
      - usuario: { id, nombre, correo }
    """
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]


class MeView(APIView):
    """
    Devuelve los datos del usuario autenticado a partir del token:
      - id
      - correo
      - nombre
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        return Response({
            "id": user.id,
            "correo": user.correo,  
            "nombre": user.nombre,
        })
