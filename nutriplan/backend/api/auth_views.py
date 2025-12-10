from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import UsuarioSerializer  # uso el serializer de usuario


class LoginView(APIView):
    """
    Login manual usando correo + password.

    - No usa autenticación por encabezado (token) en este endpoint.
    - Si las credenciales son correctas, genera tokens JWT y retorna datos del usuario.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        correo = request.data.get("correo")
        password = request.data.get("password")

        if not correo or not password:
            return Response(
                {"detail": "Debe enviar correo y password."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Autentica usando el backend personalizado (correo + password)
        user = authenticate(request, correo=correo, password=password)

        if user is None:
            return Response(
                {"detail": "Credenciales inválidas."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not user.is_active:
            return Response(
                {"detail": "La cuenta está desactivada."},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Generar tokens JWT
        refresh = RefreshToken.for_user(user)

        data = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "usuario": UsuarioSerializer(user).data,
        }
        return Response(data, status=status.HTTP_200_OK)


class MeView(APIView):
    """
    Devuelve los datos del usuario autenticado a partir del token válido.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        data = UsuarioSerializer(user).data
        return Response(data)
