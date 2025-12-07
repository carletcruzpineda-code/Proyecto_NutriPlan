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
class UsuarioListCreateView(generics.CreateAPIView):
    """
    - POST /api/usuarios/ → crea usuario nuevo (registro desde el frontend).
    (No permitimos listar usuarios para evitar exponer datos de otros.)
    """
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [AllowAny]


# -----------------------------------
# ALIMENTOS
# -----------------------------------
class AlimentoListCreateView(generics.ListCreateAPIView):
    """
    - GET /api/alimentos/ → puede usarse incluso sin estar autenticado
      (IsAuthenticatedOrReadOnly).
    - POST /api/alimentos/ → requiere autenticación.
    """
    queryset = Alimento.objects.all()
    serializer_class = AlimentoSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


# -----------------------------------
# REGISTROS DE CONSUMO (LISTAR / CREAR)
# -----------------------------------
class RegistroConsumoListCreateView(generics.ListCreateAPIView):
    """
    - GET /api/registros/ → lista SOLO los registros del usuario autenticado.
    - POST /api/registros/ → crea un registro para el usuario autenticado.
    """
    serializer_class = RegistroConsumoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Solo los registros del usuario logueado
        return (
            RegistroConsumo.objects
            .filter(usuario=self.request.user)
            .select_related("alimento")
            .order_by("-fecha", "-id")
        )

    def perform_create(self, serializer):
        """
        Asignar el usuario autenticado automáticamente.
        La fecha se genera sola (auto_now_add en el modelo).
        """
        serializer.save(usuario=self.request.user)


# -----------------------------------
# REGISTRO DE CONSUMO (DETALLE: VER / EDITAR / ELIMINAR)
# -----------------------------------
class RegistroConsumoDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    - GET /api/registros/<id>/
    - PATCH /api/registros/<id>/
    - DELETE /api/registros/<id>/
    Siempre restringido a registros del usuario autenticado.
    """
    serializer_class = RegistroConsumoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Solo permite acceder a registros propios
        return (
            RegistroConsumo.objects
            .filter(usuario=self.request.user)
            .select_related("alimento")
        )


# -----------------------------------
# INDICADORES DE PROGRESO
# -----------------------------------
class IndicadorProgresoListView(generics.ListAPIView):
    """
    - GET /api/indicadores/
    Devuelve SOLO los indicadores asociados al usuario autenticado.
    """
    serializer_class = IndicadorProgresoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return (
            IndicadorProgreso.objects
            .filter(usuario=self.request.user)
            .order_by("-fecha", "-id")
        )
