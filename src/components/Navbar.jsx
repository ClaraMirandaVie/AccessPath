import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [ theme, setTheme ] = useState(localStorage.getItem("ap_theme") || "light");

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("ap_theme", next);
    setTheme(next);
  };

  const handleLogo = () => navigate("/");

  return (
    <header className="nav card">
      <div className="nav-left" onClick={handleLogo} style={{cursor:"pointer"}}>
        <div className="logo">AccessPath</div>
        <div className="logo-sub small">Acessibilidade urbana colaborativa</div>
      </div>

      <nav className="nav-links">
        <Link to="/">Início</Link>
        <Link to="/map">Mapa</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/profile">Perfil</Link>
        <button onClick={toggleTheme} className="btn ghost" style={{marginLeft:12}}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </nav>
    </header>
  );
}
