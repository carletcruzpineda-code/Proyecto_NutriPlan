# NutriPlan

Aplicación web full‑stack para registro de alimentos,seguimiento de calorías/macros y gestión básica de usuarios, con autenticación por JWT y un panel de administración.
NutriPlan es una app web donde: Un usuario se registra e inicia sesión.Consulta una lista de alimentos (con calorías y macronutrientes)Registra consumos (por ejemplo, “Manzana – 120 g”), y el backend calcula los totales (calorías/macros).
Puede ver sus registros y sus indicadores (progreso).Existe un panel de administración** para gestionar usuarios y alimentos (solo admins).
Frontend (React)**: UI + navegación + consumo de API-
Backend (Django REST)**: API REST + auth JWT + lógica de negocio + acceso a MySQL

Tecnologías (stack)

 Backend
- Python + Django (proyecto `backend`)
- Django REST Framework
- JWT con `rest_framework_simplejwt`
- MySQL como base de datos
- CORS con `django-cors-headers`

 Frontend
- React + Vite
- React Router
- Axios (cliente HTTP)
- Bootstrap (estilos base)

 Estructura del repositorio

- `nutriplan/backend/` → Backend Django (API REST).
- `nutriplan/frontend/` → Frontend React (SPA).

 Endpoints principales (backend)

- `POST /api/usuarios/` → registro
- `POST /api/auth/login/` → login (retorna `access`, `refresh` y `usuario`)
- `GET /api/auth/me/` → devuelve usuario desde el token
- `GET /api/alimentos/` → lista de alimentos
- `GET/POST /api/registros/` → registros de consumo (del usuario)
- `PATCH /api/admin/usuarios/{id}/promote/` → convertir usuario en admin *(requiere admin)*

 Referencias

- Repositorio: https://github.com/carletcruzpineda-code/Proyecto_NutriPlan.git

> Nota de seguridad: en `backend/backend/settings.py` hay credenciales de MySQL en texto plano. En un proyecto real se recomienda usar variables de entorno y no commitear secretos.
