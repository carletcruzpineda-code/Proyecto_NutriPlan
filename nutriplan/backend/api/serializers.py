from rest_framework import serializers
from .models import (
    Usuario, IndicadorProgreso, Articulo,
    Alimento, RegistroConsumo, PlanNutricional, PlanAlimento
)

# ---------------------------
# SERIALIZER: Usuario
# ---------------------------
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'
        read_only_fields = ('fecha_registro',)


# ---------------------------
# SERIALIZER: IndicadorProgreso
# ---------------------------
class IndicadorProgresoSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndicadorProgreso
        fields = '__all__'


# ---------------------------
# SERIALIZER: Articulo
# ---------------------------
class ArticuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Articulo
        fields = '__all__'
        read_only_fields = ('fecha_publicacion',)


# ---------------------------
# SERIALIZER: Alimento
# ---------------------------
class AlimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alimento
        fields = '__all__'


# ---------------------------
# SERIALIZER: RegistroConsumo
# ---------------------------
class RegistroConsumoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroConsumo
        fields = '__all__'


# ---------------------------
# SERIALIZER: PlanAlimento
# ---------------------------
class PlanAlimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanAlimento
        fields = '__all__'


# ---------------------------
# SERIALIZER: PlanNutricional
# ---------------------------
class PlanNutricionalSerializer(serializers.ModelSerializer):
    alimentos_plan = PlanAlimentoSerializer(many=True, read_only=True)

    class Meta:
        model = PlanNutricional
        fields = '__all__'
