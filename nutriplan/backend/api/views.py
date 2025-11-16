from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, AllowAny


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
    permission_classes = [AllowAny]   # registro público


class UsuarioDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated]


# ---------------------------
# 2. INDICADOR PROGRESO
# ---------------------------
class IndicadorProgresoListCreateView(ListCreateAPIView):
    queryset = IndicadorProgreso.objects.all()
    serializer_class = IndicadorProgresoSerializer
    permission_classes = [IsAuthenticated]



class IndicadorProgresoDetailView(RetrieveUpdateDestroyAPIView):
    queryset = IndicadorProgreso.objects.all()
    serializer_class = IndicadorProgresoSerializer
    permission_classes = [IsAuthenticated]



# ---------------------------
# 3. ARTÍCULO
# ---------------------------
class ArticuloListCreateView(ListCreateAPIView):
    queryset = Articulo.objects.all()
    serializer_class = ArticuloSerializer
    permission_classes = [AllowAny]


class ArticuloDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Articulo.objects.all()
    serializer_class = ArticuloSerializer
    permission_classes = [AllowAny]


# ---------------------------
# 4. ALIMENTO
# ---------------------------
class AlimentoListCreateView(ListCreateAPIView):
    queryset = Alimento.objects.all()
    serializer_class = AlimentoSerializer
    permission_classes = [AllowAny]


class AlimentoDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Alimento.objects.all()
    serializer_class = AlimentoSerializer
    permission_classes = [AllowAny]


# ---------------------------
# 5. REGISTRO CONSUMO
# ---------------------------
class RegistroConsumoListCreateView(ListCreateAPIView):
    queryset = RegistroConsumo.objects.all()
    serializer_class = RegistroConsumoSerializer
    permission_classes = [IsAuthenticated]


class RegistroConsumoDetailView(RetrieveUpdateDestroyAPIView):
    queryset = RegistroConsumo.objects.all()
    serializer_class = RegistroConsumoSerializer
    permission_classes = [IsAuthenticated]


# ---------------------------
# 6. PLAN NUTRICIONAL
# ---------------------------
class PlanNutricionalListCreateView(ListCreateAPIView):
    queryset = PlanNutricional.objects.all()
    serializer_class = PlanNutricionalSerializer
    permission_classes = [IsAuthenticated]


class PlanNutricionalDetailView(RetrieveUpdateDestroyAPIView):
    queryset = PlanNutricional.objects.all()
    serializer_class = PlanNutricionalSerializer
    permission_classes = [IsAuthenticated]


# ---------------------------
# 7. PLAN ALIMENTO
# ---------------------------
class PlanAlimentoListCreateView(ListCreateAPIView):
    queryset = PlanAlimento.objects.all()
    serializer_class = PlanAlimentoSerializer


class PlanAlimentoDetailView(RetrieveUpdateDestroyAPIView):
    queryset = PlanAlimento.objects.all()
    serializer_class = PlanAlimentoSerializer
