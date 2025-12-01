# backend/api/serializers.py

from rest_framework import serializers
from .models import (
    Usuario,
    Alimento,
    RegistroConsumo,
    IndicadorProgreso,
    PlanNutricional,
    PlanAlimento
)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# ============================================================
# USUARIO
# ============================================================
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ["id", "nombre", "correo"]


# ============================================================
# LOGIN JWT
# ============================================================
class LoginSerializer(TokenObtainPairSerializer):
    username_field = "correo"

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["nombre"] = user.nombre
        token["correo"] = user.correo
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data["usuario"] = UsuarioSerializer(self.user).data
        return data


# ============================================================
# ALIMENTO
# ============================================================
class AlimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alimento
        fields = [
            "id",
            "nombre",
            "categoria",
            "calorias",
            "carbohidratos",
            "proteina",
            "grasas"
        ]


# ============================================================
# REGISTRO DE CONSUMO
# ============================================================
class RegistroConsumoSerializer(serializers.ModelSerializer):
    alimento_detalle = AlimentoSerializer(source="alimento", read_only=True)

    total_calorias = serializers.SerializerMethodField()
    total_carbohidratos = serializers.SerializerMethodField()
    total_proteinas = serializers.SerializerMethodField()
    total_grasas = serializers.SerializerMethodField()

    class Meta:
        model = RegistroConsumo
        fields = [
            "id",
            "usuario",
            "alimento",
            "cantidad_consumida",
            "fecha",
            "alimento_detalle",
            "total_calorias",
            "total_carbohidratos",
            "total_proteinas",
            "total_grasas",
        ]
        extra_kwargs = {
            "usuario": {"read_only": True},
        }

    def get_total_calorias(self, obj):
        return round((obj.alimento.calorias * obj.cantidad_consumida) / 100, 2)

    def get_total_carbohidratos(self, obj):
        return round((obj.alimento.carbohidratos * obj.cantidad_consumida) / 100, 2)

    def get_total_proteinas(self, obj):
        return round((obj.alimento.proteina * obj.cantidad_consumida) / 100, 2)

    def get_total_grasas(self, obj):
        return round((obj.alimento.grasas * obj.cantidad_consumida) / 100, 2)


# ============================================================
# INDICADORES DE PROGRESO  ← FALTABA ESTA PARTE
# ============================================================
class IndicadorProgresoSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndicadorProgreso
        fields = "__all__"


# ============================================================
# PLAN NUTRICIONAL
# ============================================================
class PlanNutricionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanNutricional
        fields = "__all__"


# ============================================================
# PLAN ALIMENTO
# ============================================================
class PlanAlimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanAlimento
        fields = "__all__"
