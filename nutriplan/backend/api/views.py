# backend/api/views.py

from rest_framework import generics, permissions
from rest_framework.permissions import AllowAny

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
# REGISTROS DE CONSUMO (LISTAR / CREAR)
# -----------------------------------
class RegistroConsumoListCreateView(generics.ListCreateAPIView):
    queryset = RegistroConsumo.objects.all()
    serializer_class = RegistroConsumoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        """
        Asignar el usuario autenticado automáticamente.
        """
        serializer.save(usuario=self.request.user)


# -----------------------------------
# REGISTRO DE CONSUMO (DETALLE: VER / EDITAR / ELIMINAR)
# -----------------------------------
class RegistroConsumoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = RegistroConsumo.objects.all()
    serializer_class = RegistroConsumoSerializer
    permission_classes = [permissions.IsAuthenticated]


# -----------------------------------
# INDICADORES DE PROGRESO
# -----------------------------------
class IndicadorProgresoListView(generics.ListAPIView):
    queryset = IndicadorProgreso.objects.all()
    serializer_class = IndicadorProgresoSerializer
    permission_classes = [permissions.IsAuthenticated]
