
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny


class LoginView(APIView):
    permission_classes = [AllowAny]  

    def post(self, request):
        correo = request.data.get("correo")
        password = request.data.get("password")

        user = authenticate(request, correo=correo, password=password)

        if user is None:
            return Response(
                {"error": "Credenciales inválidas"},
                status=status.HTTP_400_BAD_REQUEST
            )

        refresh = RefreshToken.for_user(user)

        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "usuario": {
                "id": user.id,
                "correo": user.correo,
                "nombre": user.nombre
            }
        })


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "correo": user.correo,
            "nombre": user.nombre,
        })
