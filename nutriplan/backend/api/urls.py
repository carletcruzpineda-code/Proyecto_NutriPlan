from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    UsuarioListCreateView,
    AlimentoListCreateView,
    RegistroConsumoListCreateView,
    RegistroConsumoDetailView,
    IndicadorProgresoListView,
)
from .auth_views import LoginView, MeView
from .admin_views import AdminUsuarioViewSet, AdminAlimentoViewSet

router = DefaultRouter()
router.register(r"admin/usuarios", AdminUsuarioViewSet, basename="admin-usuarios")
router.register(r"admin/alimentos", AdminAlimentoViewSet, basename="admin-alimentos")

urlpatterns = [
    # =========================
    # REGISTRO / AUTH
    # =========================
    path("usuarios/", UsuarioListCreateView.as_view(), name="registro-usuario"),
    path("auth/login/", LoginView.as_view(), name="login"),
    path("auth/me/", MeView.as_view(), name="me"),

    # =========================
    # ALIMENTOS
    # =========================
    path("alimentos/", AlimentoListCreateView.as_view()),

    # =========================
    # REGISTROS CONSUMO
    # =========================
    path("registros/", RegistroConsumoListCreateView.as_view()),
    path("registros/<int:pk>/", RegistroConsumoDetailView.as_view()),

    # =========================
    # INDICADORES
    # =========================
    path("indicadores/", IndicadorProgresoListView.as_view()),

    # =========================
    # ADMIN (ROUTER)
    # =========================
    path("", include(router.urls)),
]
