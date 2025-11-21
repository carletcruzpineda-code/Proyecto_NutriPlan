from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


# ---------------------------
# CUSTOM USER MANAGER
# ---------------------------
class UsuarioManager(BaseUserManager):
    def create_user(self, correo, password=None, **extra_fields):
        if not correo:
            raise ValueError("El usuario debe tener un correo electrónico")

        correo = self.normalize_email(correo)
        user = self.model(correo=correo, **extra_fields)

        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()

        user.save(using=self._db)
        return user

    def create_superuser(self, correo, password=None, **extra_fields):
        
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        
        extra_fields.setdefault("nombre", "Admin")
        extra_fields.setdefault("edad", 0)
        extra_fields.setdefault("altura", 0)
        extra_fields.setdefault("peso", 0)
        extra_fields.setdefault("objetivo", "admin")
        extra_fields.setdefault("genero", "N/A")
        extra_fields.setdefault("usuario_tipo", "admin")

        return self.create_user(correo, password, **extra_fields)



class Usuario(AbstractBaseUser, PermissionsMixin):
    usuario_tipo = models.CharField(max_length=100)
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    edad = models.IntegerField()
    altura = models.DecimalField(max_digits=5, decimal_places=2)
    peso = models.DecimalField(max_digits=5, decimal_places=2)
    objetivo = models.CharField(max_length=100)
    fecha_registro = models.DateField(auto_now_add=True)
    genero = models.CharField(max_length=100)
    condicion_medica = models.TextField(blank=True, null=True)
    alergia = models.TextField(blank=True, null=True)

    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UsuarioManager()

    USERNAME_FIELD = "correo"
    REQUIRED_FIELDS = ["nombre"]  

    def __str__(self):
        return self.nombre



class IndicadorProgreso(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="indicadores_progreso")
    fecha = models.DateField()
    peso_actual = models.DecimalField(max_digits=5, decimal_places=2)
    calorias_diarias = models.DecimalField(max_digits=5, decimal_places=2)
    porcentaje_objetivo = models.FloatField()

    def __str__(self):
        return f"{self.usuario.nombre} - {self.fecha}"


class Articulo(models.Model):
    titulo = models.CharField(max_length=150)
    contenido = models.TextField()
    categoria = models.CharField(max_length=50)
    fecha_publicacion = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.titulo


class Alimento(models.Model):
    nombre = models.CharField(max_length=100)
    categoria = models.CharField(max_length=50)
    calorias = models.DecimalField(max_digits=6, decimal_places=2)
    carbohidratos = models.DecimalField(max_digits=6, decimal_places=2)
    proteina = models.DecimalField(max_digits=6, decimal_places=2)
    grasas = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.nombre


class RegistroConsumo(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="registros_consumo")
    alimento = models.ForeignKey(Alimento, on_delete=models.CASCADE, related_name="registros_consumo")
    cantidad_consumida = models.DecimalField(max_digits=6, decimal_places=2)
    fecha = models.DateField()
    peso_actual = models.DecimalField(max_digits=8, decimal_places=2)
    total_calorias = models.DecimalField(max_digits=8, decimal_places=2)
    total_proteinas = models.DecimalField(max_digits=8, decimal_places=2)
    total_grasas = models.DecimalField(max_digits=8, decimal_places=2)
    total_carbohidratos = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f"{self.usuario.nombre} - {self.alimento.nombre} ({self.fecha})"


class PlanNutricional(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="planes_nutricionales")
    consumo = models.ForeignKey(RegistroConsumo, on_delete=models.CASCADE, related_name="planes_nutricionales")
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=255)
    calorias_objetivos_totales = models.DecimalField(max_digits=8, decimal_places=2)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()

    def __str__(self):
        return f"{self.nombre} ({self.usuario.nombre})"


class PlanAlimento(models.Model):
    plan = models.ForeignKey(PlanNutricional, on_delete=models.CASCADE, related_name="alimentos_plan")
    alimento = models.ForeignKey(Alimento, on_delete=models.CASCADE, related_name="planes_alimento")
    porciones = models.DecimalField(max_digits=6, decimal_places=2)

    class Meta:
        unique_together = ('plan', 'alimento')

    def __str__(self):
        return f"{self.plan.nombre} - {self.alimento.nombre}"
    