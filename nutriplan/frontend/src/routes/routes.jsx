// src/routes/routes.jsx
import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "../pages/LandingPage.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import InfoNutricional from "../pages/InfoNutricional.jsx";
import AgregarComida from "../pages/AgregarComida.jsx";
import AcercaDeNutriPlan from "../pages/AcercaDeNutriPlan.jsx";

import PrivateRoute from "./PrivateRoute.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Página pública */}
      <Route path="/" element={<LandingPage />} />

      {/* Acerca de NutriPlan */}
      <Route path="/acerca" element={<AcercaDeNutriPlan />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard protegido */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* Agregar comida protegido */}
      <Route
        path="/agregar"
        element={
          <PrivateRoute>
            <AgregarComida />
          </PrivateRoute>
        }
      />

      {/* Info Nutricional protegida (si quieres que pida login) */}
      <Route
        path="/info"
        element={
          <PrivateRoute>
            <InfoNutricional />
          </PrivateRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
  