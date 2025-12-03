from django.urls import path
from .auth_views import LoginView, MeView
from . import views

urlpatterns = [
    # autenticación
    path("auth/login/", LoginView.as_view()),
    path("auth/me/", MeView.as_view()),

    # tus endpoints normales
    path("usuarios/", views.UsuarioListCreateView.as_view()),
    path("alimentos/", views.AlimentoListCreateView.as_view()),
    path("registros/", views.RegistroConsumoListCreateView.as_view()),
    path("registros/<int:pk>/", views.RegistroConsumoDetailView.as_view()),  # <- NUEVO
    path("indicadores/", views.IndicadorProgresoListView.as_view()),
]
