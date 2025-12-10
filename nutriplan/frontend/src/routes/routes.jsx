
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import InfoNutricional from "../pages/InfoNutricional";
import AgregarComida from "../pages/AgregarComida";
import AcercaDeNutriPlan from "../pages/AcercaDeNutriPlan";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Página pública */}
      <Route path="/" element={<LandingPage />} />

      {/* Nueva página: Acerca de NutriPlan */}
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

      {/* Info Nutricional protegida (si quisiera que pida login) */}
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
  