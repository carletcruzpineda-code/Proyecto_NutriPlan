from rest_framework import serializers
from .models import Usuario, Alimento


# =========================
# USUARIOS (ADMIN)
# =========================

class AdminUsuarioListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = (
            "id",
            "nombre",
            "correo",
            "usuario_tipo",
            "objetivo",
            "is_staff",
        )


class CrearAdminSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = Usuario
        fields = (
            "id",
            "nombre",
            "correo",
            "password",
        )

    def validate_correo(self, value):
        if Usuario.objects.filter(correo=value).exists():
            raise serializers.ValidationError(
                "Ya existe un usuario con este correo."
            )
        return value

    def create(self, validated_data):
        password = validated_data.pop("password")

        user = Usuario(
            **validated_data,
            usuario_tipo="admin",
            is_staff=True,
            is_superuser=False,
        )
        user.set_password(password)
        user.save()
        return user


# =========================
# ALIMENTOS (ADMIN)
# =========================

class AdminAlimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alimento
        fields = "__all__"
