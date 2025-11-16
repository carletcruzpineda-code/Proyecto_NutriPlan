from django.contrib.auth.backends import ModelBackend
from api.models import Usuario

class CorreoBackend(ModelBackend):
    def authenticate(self, request, correo=None, password=None, **kwargs):
        try:
            user = Usuario.objects.get(correo=correo)
        except Usuario.DoesNotExist:
            return None

        if user.check_password(password):
            return user
        return None
