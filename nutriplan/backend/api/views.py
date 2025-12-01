# backend/api/views.py

from rest_framework import generics, permissions
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from .models import Usuario, Alimento, RegistroConsumo, IndicadorProgreso
from .serializers import (
    UsuarioSerializer,
    AlimentoSerializer,
    RegistroConsumoSerializer,
    IndicadorProgresoSerializer,
)


# -----------------------------------
# USUARIOS
# -----------------------------------
class UsuarioListCreateView(generics.ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [AllowAny]


# -----------------------------------
# ALIMENTOS
# -----------------------------------
class AlimentoListCreateView(generics.ListCreateAPIView):
    queryset = Alimento.objects.all()
    serializer_class = AlimentoSerializer
    permission_classes = [permissions.IsAuthenticated]


# -----------------------------------
# REGISTROS DE CONSUMO
# -----------------------------------
class RegistroConsumoListCreateView(generics.ListCreateAPIView):
    queryset = RegistroConsumo.objects.all()
    serializer_class = RegistroConsumoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        """
        Asignar el usuario autenticado automáticamente.
        Esta línea SOLUCIONA el error:
        IntegrityError: usuario_id cannot be null
        """
        serializer.save(usuario=self.request.user)


# -----------------------------------
# INDICADORES DE PROGRESO
# -----------------------------------
class IndicadorProgresoListView(generics.ListAPIView):
    queryset = IndicadorProgreso.objects.all()
    serializer_class = IndicadorProgresoSerializer
    permission_classes = [permissions.IsAuthenticated]
