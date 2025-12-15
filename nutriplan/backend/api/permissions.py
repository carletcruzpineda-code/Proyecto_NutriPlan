# nutriplan/backend/api/permissions.py

from rest_framework.permissions import BasePermission

class IsAdminUsuario(BasePermission):
    """
    Permite acceso solo a usuarios admin.
    Consideramos admin si:
    - is_staff True (recomendado)
    o
    - usuario_tipo == "admin"
    """
    message = "Acceso restringido: solo administradores."

    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated:
            return False
        return bool(getattr(user, "is_staff", False) or getattr(user, "usuario_tipo", "") == "admin")
