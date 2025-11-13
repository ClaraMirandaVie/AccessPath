import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <section className="home fade-up">
      <div className="hero card">
        <h1>AccessPath</h1>
        <p className="small">Mapeie, compartilhe e descubra lugares acessíveis na sua cidade.</p>
        <div style={{marginTop:16}}>
          <Link to="/map" className="btn">Explorar Mapa</Link>
          <Link to="/register" style={{marginLeft:12}} className="btn ghost">Criar Conta</Link>
        </div>
      </div>

      <div style={{marginTop:30}}>
        <h2>Recursos</h2>
        <div className="grid-cards" style={{marginTop:16}}>
          <div className="card">
            <h3>Mapa interativo</h3>
            <p className="small">Visualize locais com avaliações e detalhes de acessibilidade.</p>
          </div>
          <div className="card">
            <h3>Feed de locais</h3>
            <p className="small">Cada estabelecimento aparece como um post com comentários.</p>
          </div>
          <div className="card">
            <h3>Painel administrador</h3>
            <p className="small">Admins cadastram e gerenciam estabelecimentos.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
