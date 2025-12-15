# nutriplan/backend/api/urls.py

from django.urls import path
from .auth_views import LoginView, MeView
from . import views
from . import admin_views

urlpatterns = [
    # autenticación
    path("auth/login/", LoginView.as_view()),
    path("auth/me/", MeView.as_view()),

    # endpoints principales (usuario normal)
    path("usuarios/", views.UsuarioListCreateView.as_view()),
    path("alimentos/", views.AlimentoListCreateView.as_view()),
    path("registros/", views.RegistroConsumoListCreateView.as_view()),
    path("registros/<int:pk>/", views.RegistroConsumoDetailView.as_view()),
    path("indicadores/", views.IndicadorProgresoListView.as_view()),

    # =========================
    # ADMIN API
    # =========================
    path("admin/usuarios/", admin_views.AdminUsuarioListView.as_view()),
    path("admin/usuarios/crear-admin/", admin_views.AdminCreateAdminView.as_view()),

    # PATCH objetivo / DELETE usuario
    path("admin/usuarios/<int:pk>/", admin_views.AdminUsuarioDetailView.as_view()),

    path("admin/usuarios/<int:pk>/promote/", admin_views.AdminUsuarioPromoteView.as_view()),
    path("admin/usuarios/<int:pk>/password/", admin_views.AdminUsuarioPasswordView.as_view()),

    path("admin/alimentos/", admin_views.AdminAlimentoListCreateView.as_view()),
    path("admin/alimentos/<int:pk>/", admin_views.AdminAlimentoDetailView.as_view()),
]
