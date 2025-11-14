from django.db import models


from django.db import models

# ---------------------------
# 1. TABLA: USUARIO
# ---------------------------
class Usuario(models.Model):
    usuario_tipo = models.CharField(max_length=100)
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    edad = models.IntegerField()
    altura = models.DecimalField(max_digits=5, decimal_places=2)
    peso = models.DecimalField(max_digits=5, decimal_places=2)
    contraseña = models.CharField(max_length=255)
    objetivo = models.CharField(max_length=100)
    fecha_registro = models.DateField(auto_now_add=True)
    genero = models.CharField(max_length=100)
    condicion_medica = models.TextField(blank=True, null=True)
    alergia = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre


# ---------------------------
# 2. TABLA: INDICADOR_PROGRESO
# ---------------------------
class IndicadorProgreso(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="indicadores_progreso")
    fecha = models.DateField()
    peso_actual = models.DecimalField(max_digits=5, decimal_places=2)
    calorias_diarias = models.DecimalField(max_digits=5, decimal_places=2)
    porcentaje_objetivo = models.FloatField()

    def __str__(self):
        return f"{self.usuario.nombre} - {self.fecha}"


# ---------------------------
# 3. TABLA: ARTICULO
# ---------------------------
class Articulo(models.Model):
    titulo = models.CharField(max_length=150)
    contenido = models.TextField()
    categoria = models.CharField(max_length=50)
    fecha_publicacion = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.titulo


# ---------------------------
# 4. TABLA: ALIMENTO
# ---------------------------
class Alimento(models.Model):
    nombre = models.CharField(max_length=100)
    categoria = models.CharField(max_length=50)
    calorias = models.DecimalField(max_digits=6, decimal_places=2)
    carbohidratos = models.DecimalField(max_digits=6, decimal_places=2)
    proteina = models.DecimalField(max_digits=6, decimal_places=2)
    grasas = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.nombre


# ---------------------------
# 5. TABLA: REGISTRO_CONSUMO
# ---------------------------
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


# ---------------------------
# 6. TABLA: PLAN_NUTRICIONAL
# ---------------------------
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


# ---------------------------
# 7. TABLA: PLAN_ALIMENTO
# ---------------------------
class PlanAlimento(models.Model):
    plan = models.ForeignKey(PlanNutricional, on_delete=models.CASCADE, related_name="alimentos_plan")
    alimento = models.ForeignKey(Alimento, on_delete=models.CASCADE, related_name="planes_alimento")
    porciones = models.DecimalField(max_digits=6, decimal_places=2)

    class Meta:
        unique_together = ('plan', 'alimento')

    def __str__(self):
        return f"{self.plan.nombre} - {self.alimento.nombre}"
