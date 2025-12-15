# nutriplan/backend/api/admin_serializers.py

from rest_framework import serializers
from .models import Usuario, Alimento

class AdminUsuarioListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = [
            "id",
            "usuario_tipo",
            "nombre",
            "correo",
            "edad",
            "altura",
            "peso",
            "objetivo",
            "genero",
            "condicion_medica",
            "alergia",
            "is_staff",
            "is_active",
            "fecha_registro",
        ]


class AdminUsuarioUpdateSerializer(serializers.ModelSerializer):
    """
    Actualizaciones permitidas por admin (por ahora: objetivo).
    Puedes agregar más campos luego si lo ocupas.
    """
    class Meta:
        model = Usuario
        fields = ["objetivo"]


class AdminCreateUsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Usuario
        fields = [
            "id",
            "usuario_tipo",
            "nombre",
            "correo",
            "edad",
            "altura",
            "peso",
            "objetivo",
            "genero",
            "condicion_medica",
            "alergia",
            "password",
        ]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = Usuario.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user


class AdminPasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(write_only=True, required=True, min_length=6)


class AdminAlimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alimento
        fields = "__all__"
