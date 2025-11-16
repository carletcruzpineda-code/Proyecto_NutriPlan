from rest_framework import serializers
from .models import (
    Usuario, IndicadorProgreso, Articulo,
    Alimento, RegistroConsumo, PlanNutricional, PlanAlimento
)

class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Usuario
        fields = '__all__'
        read_only_fields = ('fecha_registro',)

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = Usuario.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user


class IndicadorProgresoSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndicadorProgreso
        fields = '__all__'


class ArticuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Articulo
        fields = '__all__'


class AlimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alimento
        fields = '__all__'


class RegistroConsumoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroConsumo
        fields = '__all__'


class PlanAlimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanAlimento
        fields = '__all__'


class PlanNutricionalSerializer(serializers.ModelSerializer):
    alimentos_plan = PlanAlimentoSerializer(many=True, read_only=True)

    class Meta:
        model = PlanNutricional
        fields = '__all__'
