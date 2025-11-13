import React, { useState } from "react";
import axios from "axios";
import "./ProfilePage.css";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("ap_user") || "null");
  const [nome, setNome] = useState(user ? user.nome : "");
  const [msg, setMsg] = useState("");

  const save = async () => {
    try {
      if (!user) return;
      await axios.put(`http://localhost:8800/api/users/${user.id}`, { nome, senha: user.senha, tipo: user.tipo });
      setMsg("Perfil atualizado!");
      localStorage.setItem("ap_user", JSON.stringify({ ...user, nome }));
    } catch {
      setMsg("Erro ao salvar.");
    }
  };

  return (
    <section className="profile fade-up">
      <div className="card" style={{maxWidth:600, margin:"1.5rem auto"}}>
        <h2>Meu Perfil</h2>
        <label className="small">Nome</label>
        <input className="input" value={nome} onChange={(e)=>setNome(e.target.value)} />
        <label className="small" style={{marginTop:8}}>E-mail</label>
        <input className="input" value={user ? user.email : ""} disabled />
        <div style={{marginTop:12, display:"flex", gap:10}}>
          <button className="btn" onClick={save}>Salvar</button>
        </div>
        {msg && <p className="small" style={{marginTop:10}}>{msg}</p>}
      </div>
    </section>
  );
}
