// src/pages/LandingPage.jsx

import Hero from "../components/landing/Hero";
import Beneficios from "../components/landing/Beneficios";
import SeccionCTA from "../components/landing/SeccionCTA";
import FooterLanding from "../components/landing/FooterLanding";
import HeaderLanding from "../components/landing/HeaderLanding";
import "../styles/landing.css";

export default function LandingPage() {
  return (
    <div className="landing-container">
      <HeaderLanding />

      <Hero />

      <Beneficios />

      <SeccionCTA />

      <FooterLanding />
    </div>
  );
}
