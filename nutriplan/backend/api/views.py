from django.shortcuts import render

from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import (
    Usuario, IndicadorProgreso, Articulo,
    Alimento, RegistroConsumo, PlanNutricional, PlanAlimento
)
from .serializers import (
    UsuarioSerializer, IndicadorProgresoSerializer, ArticuloSerializer,
    AlimentoSerializer, RegistroConsumoSerializer, PlanNutricionalSerializer, PlanAlimentoSerializer
)


# ---------------------------
# 1. USUARIO
# ---------------------------
class UsuarioListCreateView(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class UsuarioDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


# ---------------------------
# 2. INDICADOR PROGRESO
# ---------------------------
class IndicadorProgresoListCreateView(ListCreateAPIView):
    queryset = IndicadorProgreso.objects.all()
    serializer_class = IndicadorProgresoSerializer


class IndicadorProgresoDetailView(RetrieveUpdateDestroyAPIView):
    queryset = IndicadorProgreso.objects.all()
    serializer_class = IndicadorProgresoSerializer


# ---------------------------
# 3. ARTÍCULO
# ---------------------------
class ArticuloListCreateView(ListCreateAPIView):
    queryset = Articulo.objects.all()
    serializer_class = ArticuloSerializer


class ArticuloDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Articulo.objects.all()
    serializer_class = ArticuloSerializer


# ---------------------------
# 4. ALIMENTO
# ---------------------------
class AlimentoListCreateView(ListCreateAPIView):
    queryset = Alimento.objects.all()
    serializer_class = AlimentoSerializer


class AlimentoDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Alimento.objects.all()
    serializer_class = AlimentoSerializer


# ---------------------------
# 5. REGISTRO CONSUMO
# ---------------------------
class RegistroConsumoListCreateView(ListCreateAPIView):
    queryset = RegistroConsumo.objects.all()
    serializer_class = RegistroConsumoSerializer


class RegistroConsumoDetailView(RetrieveUpdateDestroyAPIView):
    queryset = RegistroConsumo.objects.all()
    serializer_class = RegistroConsumoSerializer


# ---------------------------
# 6. PLAN NUTRICIONAL
# ---------------------------
class PlanNutricionalListCreateView(ListCreateAPIView):
    queryset = PlanNutricional.objects.all()
    serializer_class = PlanNutricionalSerializer


class PlanNutricionalDetailView(RetrieveUpdateDestroyAPIView):
    queryset = PlanNutricional.objects.all()
    serializer_class = PlanNutricionalSerializer


# ---------------------------
# 7. PLAN ALIMENTO
# ---------------------------
class PlanAlimentoListCreateView(ListCreateAPIView):
    queryset = PlanAlimento.objects.all()
    serializer_class = PlanAlimentoSerializer


class PlanAlimentoDetailView(RetrieveUpdateDestroyAPIView):
    queryset = PlanAlimento.objects.all()
    serializer_class = PlanAlimentoSerializer
