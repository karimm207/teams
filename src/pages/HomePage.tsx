import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home-container">
      <h1>Bienvenue sur le Dashboard</h1>
      <p>Ceci est la page d'accueil.</p>
      <Link to="/teams">Aller au tableau de bord des équipes</Link>
    </div>
  );
}
