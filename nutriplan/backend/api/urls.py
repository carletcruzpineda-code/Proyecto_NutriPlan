from django.urls import path
from .views import (
    UsuarioListCreateView, UsuarioDetailView,
    IndicadorProgresoListCreateView, IndicadorProgresoDetailView,
    ArticuloListCreateView, ArticuloDetailView,
    AlimentoListCreateView, AlimentoDetailView,
    RegistroConsumoListCreateView, RegistroConsumoDetailView,
    PlanNutricionalListCreateView, PlanNutricionalDetailView,
    PlanAlimentoListCreateView, PlanAlimentoDetailView
)

urlpatterns = [
    # --- Usuarios ---
    path('usuarios/', UsuarioListCreateView.as_view(), name="usuarios-list-create"),
    path('usuarios/<int:pk>/', UsuarioDetailView.as_view(), name="usuarios-detail"),

    # --- Indicadores de progreso ---
    path('indicadores/', IndicadorProgresoListCreateView.as_view(), name="indicadores-list-create"),
    path('indicadores/<int:pk>/', IndicadorProgresoDetailView.as_view(), name="indicadores-detail"),

    # --- Artículos ---
    path('articulos/', ArticuloListCreateView.as_view(), name="articulos-list-create"),
    path('articulos/<int:pk>/', ArticuloDetailView.as_view(), name="articulos-detail"),

    # --- Alimentos ---
    path('alimentos/', AlimentoListCreateView.as_view(), name="alimentos-list-create"),
    path('alimentos/<int:pk>/', AlimentoDetailView.as_view(), name="alimentos-detail"),

    # --- Registro de consumo ---
    path('registros/', RegistroConsumoListCreateView.as_view(), name="registros-list-create"),
    path('registros/<int:pk>/', RegistroConsumoDetailView.as_view(), name="registros-detail"),

    # --- Planes nutricionales ---
    path('planes/', PlanNutricionalListCreateView.as_view(), name="planes-list-create"),
    path('planes/<int:pk>/', PlanNutricionalDetailView.as_view(), name="planes-detail"),

    # --- Relación plan-alimento ---
    path('plan-alimentos/', PlanAlimentoListCreateView.as_view(), name="plan-alimentos-list-create"),
    path('plan-alimentos/<int:pk>/', PlanAlimentoDetailView.as_view(), name="plan-alimentos-detail"),
]
