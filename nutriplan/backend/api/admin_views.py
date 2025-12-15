# nutriplan/backend/api/admin_views.py

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Usuario, Alimento
from .permissions import IsAdminUsuario
from .admin_serializers import (
    AdminUsuarioListSerializer,
    AdminUsuarioUpdateSerializer,
    AdminCreateUsuarioSerializer,
    AdminPasswordSerializer,
    AdminAlimentoSerializer,
)

# =========================
# USUARIOS (ADMIN)
# =========================

class AdminUsuarioListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated, IsAdminUsuario]
    serializer_class = AdminUsuarioListSerializer
    queryset = Usuario.objects.all().order_by("-fecha_registro", "-id")


class AdminCreateAdminView(generics.CreateAPIView):
    """
    Registrar un admin directamente.
    Fuerza usuario_tipo=admin + is_staff=True.
    """
    permission_classes = [IsAuthenticated, IsAdminUsuario]
    serializer_class = AdminCreateUsuarioSerializer

    def perform_create(self, serializer):
        serializer.save(usuario_tipo="admin", is_staff=True, is_active=True)


class AdminUsuarioDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    - PATCH: actualizar campos permitidos (objetivo)
    - DELETE: eliminar usuario
    """
    permission_classes = [IsAuthenticated, IsAdminUsuario]
    queryset = Usuario.objects.all()

    def get_serializer_class(self):
        if self.request.method in ("PATCH", "PUT"):
            return AdminUsuarioUpdateSerializer
        return AdminUsuarioListSerializer

    def destroy(self, request, *args, **kwargs):
        user_to_delete = self.get_object()

        # Evitar que un admin se borre a sí mismo
        if user_to_delete.id == request.user.id:
            return Response(
                {"detail": "No puedes eliminar tu propio usuario admin."},
                status=status.HTTP_400_BAD_REQUEST
            )

        return super().destroy(request, *args, **kwargs)


class AdminUsuarioPromoteView(APIView):
    """
    Convertir usuario normal en admin.
    """
    permission_classes = [IsAuthenticated, IsAdminUsuario]

    def patch(self, request, pk):
        try:
            u = Usuario.objects.get(pk=pk)
        except Usuario.DoesNotExist:
            return Response({"detail": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)

        # No promover si ya es admin
        if getattr(u, "usuario_tipo", "") == "admin" or getattr(u, "is_staff", False):
            return Response({"detail": "El usuario ya es admin."}, status=status.HTTP_200_OK)

        u.usuario_tipo = "admin"
        u.is_staff = True
        u.save()

        return Response({"detail": "Usuario promovido a admin."}, status=status.HTTP_200_OK)


class AdminUsuarioPasswordView(APIView):
    """
    Cambiar contraseña de un usuario.
    """
    permission_classes = [IsAuthenticated, IsAdminUsuario]

    def post(self, request, pk):
        try:
            u = Usuario.objects.get(pk=pk)
        except Usuario.DoesNotExist:
            return Response({"detail": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)

        serializer = AdminPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        u.set_password(serializer.validated_data["new_password"])
        u.save()

        return Response({"detail": "Contraseña actualizada."}, status=status.HTTP_200_OK)


# =========================
# ALIMENTOS (ADMIN)
# =========================

class AdminAlimentoListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated, IsAdminUsuario]
    serializer_class = AdminAlimentoSerializer
    queryset = Alimento.objects.all().order_by("nombre", "id")


class AdminAlimentoDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsAdminUsuario]
    serializer_class = AdminAlimentoSerializer
    queryset = Alimento.objects.all()
