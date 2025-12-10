from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import (
    Usuario,
    Alimento,
    RegistroConsumo,
    IndicadorProgreso,
    PlanNutricional,
    PlanAlimento,
)


# ============================================================
# OJO USUARIO (REGISTRO + LISTADO BÁSICO)
# ============================================================
class UsuarioSerializer(serializers.ModelSerializer):
    """
    Serializer para crear y representar usuarios.

    - Acepta todos los campos que envía tu formulario de registro.
    - Maneja la contraseña de forma segura (set_password).
    - No devuelve la contraseña en las respuestas.
    """

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
            "fecha_registro",
            "genero",
            "condicion_medica",
            "alergia",
            "password",
        ]
        extra_kwargs = {
            "fecha_registro": {"read_only": True},
        }

    def create(self, validated_data):
        """
        Crear usuario usando set_password para guardar la contraseña hasheada.
        """
        password = validated_data.pop("password", None)

        # Si no se envía usuario_tipo desde el frontend, por defecto "cliente"
        if not validated_data.get("usuario_tipo"):
            validated_data["usuario_tipo"] = "cliente"

        user = Usuario(**validated_data)

        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()

        user.save()
        return user

    def to_representation(self, instance):
        """
        Representación usada en respuestas (por ejemplo, /usuarios/ y login).
        Se excluye cualquier campo sensible como password (ya es write_only).
        """
        data = super().to_representation(instance)
        data.pop("password", None)
        return data


# ============================================================
# AQUÍ LOGIN JWT
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
        # Incluir datos del usuario usando el serializer alineado
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
            "grasas",
        ]


# ============================================================
# AQUÍ REGISTRO DE CONSUMO
# ============================================================
class RegistroConsumoSerializer(serializers.ModelSerializer):
    """
    - El frontend envía: alimento, cantidad_consumida.
    - El usuario se asigna automáticamente en la vista (request.user).
    - Los totales se calculan aquí a partir de alimento + cantidad_consumida.
      → El frontend NO necesita enviar total_calorias, etc.
    """

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
            "fecha": {"read_only": True},
        }

    def get_total_calorias(self, obj):
        if not obj.alimento or obj.cantidad_consumida is None:
            return 0
        return round((obj.alimento.calorias * obj.cantidad_consumida) / 100, 2)

    def get_total_carbohidratos(self, obj):
        if not obj.alimento or obj.cantidad_consumida is None:
            return 0
        return round((obj.alimento.carbohidratos * obj.cantidad_consumida) / 100, 2)

    def get_total_proteinas(self, obj):
        if not obj.alimento or obj.cantidad_consumida is None:
            return 0
        return round((obj.alimento.proteina * obj.cantidad_consumida) / 100, 2)

    def get_total_grasas(self, obj):
        if not obj.alimento or obj.cantidad_consumida is None:
            return 0
        return round((obj.alimento.grasas * obj.cantidad_consumida) / 100, 2)


# ============================================================
# OJO AQUÍ INDICADORES DE PROGRESO
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
