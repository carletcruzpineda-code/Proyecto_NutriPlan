from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Usuario, Alimento
from .admin_serializers import (
    AdminUsuarioListSerializer,
    AdminAlimentoSerializer,
)


class AdminUsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = AdminUsuarioListSerializer
    permission_classes = [permissions.IsAdminUser]

    # POST /api/admin/usuarios/crear-admin/
    @action(detail=False, methods=["post"], url_path="crear-admin")
    def crear_admin(self, request):
        nombre = request.data.get("nombre")
        correo = request.data.get("correo")
        password = request.data.get("password")

        if not nombre or not correo or not password:
            return Response(
                {"detail": "nombre, correo y password son obligatorios"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if Usuario.objects.filter(correo=correo).exists():
            return Response(
                {"detail": "Ya existe un usuario con ese correo"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = Usuario(
            nombre=nombre,
            correo=correo,

            # 🔐 CAMPOS OBLIGATORIOS DEL MODELO (DEFAULTS SEGUROS)
            edad=0,
            altura=0,
            peso=0,
            objetivo="admin",
            genero="otro",

            usuario_tipo="admin",
            is_staff=True,
            is_superuser=False,
        )
        user.set_password(password)
        user.save()

        return Response(
            AdminUsuarioListSerializer(user).data,
            status=status.HTTP_201_CREATED,
        )

    # PATCH /api/admin/usuarios/{id}/promote/
    @action(detail=True, methods=["patch"], url_path="promote")
    def promote(self, request, pk=None):
        user = self.get_object()
        user.usuario_tipo = "admin"
        user.is_staff = True
        user.save()

        return Response(
            {"detail": "Usuario promovido a admin"},
            status=status.HTTP_200_OK,
        )

    # PATCH /api/admin/usuarios/{id}/update-objetivo/
    @action(detail=True, methods=["patch"], url_path="update-objetivo")
    def update_objetivo(self, request, pk=None):
        user = self.get_object()
        objetivo = request.data.get("objetivo")

        if objetivo is None or str(objetivo).strip() == "":
            return Response(
                {"detail": "objetivo es requerido"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.objetivo = objetivo
        user.save()

        return Response(
            AdminUsuarioListSerializer(user).data,
            status=status.HTTP_200_OK,
        )


class AdminAlimentoViewSet(viewsets.ModelViewSet):
    queryset = Alimento.objects.all()
    serializer_class = AdminAlimentoSerializer
    permission_classes = [permissions.IsAdminUser]
