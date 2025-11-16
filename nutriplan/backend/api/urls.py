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
from .auth_views import LoginView, MeView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('usuarios/', UsuarioListCreateView.as_view()),
    path('usuarios/<int:pk>/', UsuarioDetailView.as_view()),

    path('indicadores/', IndicadorProgresoListCreateView.as_view()),
    path('indicadores/<int:pk>/', IndicadorProgresoDetailView.as_view()),

    path('articulos/', ArticuloListCreateView.as_view()),
    path('articulos/<int:pk>/', ArticuloDetailView.as_view()),

    path('alimentos/', AlimentoListCreateView.as_view()),
    path('alimentos/<int:pk>/', AlimentoDetailView.as_view()),

    path('registros/', RegistroConsumoListCreateView.as_view()),
    path('registros/<int:pk>/', RegistroConsumoDetailView.as_view()),

    path('planes/', PlanNutricionalListCreateView.as_view()),
    path('planes/<int:pk>/', PlanNutricionalDetailView.as_view()),

    path('plan-alimentos/', PlanAlimentoListCreateView.as_view()),
    path('plan-alimentos/<int:pk>/', PlanAlimentoDetailView.as_view()),

    # JWT
    path('auth/login/', LoginView.as_view()),
    path('auth/me/', MeView.as_view()),
    path('auth/refresh/', TokenRefreshView.as_view()),
]
