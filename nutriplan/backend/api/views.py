# nutriplan/backend/api/views.py

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
# USUARIOS (REGISTRO PÚBLICO)
# -----------------------------------
class UsuarioListCreateView(generics.CreateAPIView):
    """
    - POST /api/usuarios/ → registro público
    Seguridad: forzamos usuario_tipo="cliente" y sin privilegios.
    """
    serializer_class = UsuarioSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save(usuario_tipo="cliente", is_staff=False, is_superuser=False, is_active=True)


# -----------------------------------
# ALIMENTOS
# -----------------------------------
class AlimentoListCreateView(generics.ListCreateAPIView):
    queryset = Alimento.objects.all()
    serializer_class = AlimentoSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


# -----------------------------------
# REGISTROS CONSUMO
# -----------------------------------
class RegistroConsumoListCreateView(generics.ListCreateAPIView):
    serializer_class = RegistroConsumoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return (
            RegistroConsumo.objects
            .filter(usuario=self.request.user)
            .select_related("alimento")
            .order_by("-fecha", "-id")
        )

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)


class RegistroConsumoDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RegistroConsumoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return RegistroConsumo.objects.filter(usuario=self.request.user).select_related("alimento")


# -----------------------------------
# INDICADORES PROGRESO
# -----------------------------------
class IndicadorProgresoListView(generics.ListAPIView):
    serializer_class = IndicadorProgresoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return (
            IndicadorProgreso.objects
            .filter(usuario=self.request.user)
            .order_by("-fecha", "-id")
        )
