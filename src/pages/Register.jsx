import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";

export default function Register() {
  const [data, setData] = useState({ nome:"", email:"", senha:"", tipo:"comum" });
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/users/register", data);
      setMsg("Cadastrado com sucesso! Faça login.");
    } catch {
      setMsg("Erro ao cadastrar.");
    }
  };

  return (
    <section className="auth-wrap fade-up">
      <div className="card" style={{maxWidth:420, margin:"2rem auto"}}>
        <h2>Cadastrar</h2>
        <form onSubmit={submit}>
          <input className="input" name="nome" placeholder="Nome completo" onChange={e=>setData({...data, nome:e.target.value})} required />
          <input className="input" name="email" placeholder="E-mail" onChange={e=>setData({...data, email:e.target.value})} required />
          <input className="input" name="senha" type="password" placeholder="Senha" onChange={e=>setData({...data, senha:e.target.value})} required />
          <select className="input" name="tipo" onChange={e=>setData({...data, tipo:e.target.value})}>
            <option value="comum">Usuário Comum</option>
            <option value="admin">Administrador</option>
          </select>
          <div style={{marginTop:12}}>
            <button className="btn" type="submit">Criar conta</button>
          </div>
        </form>
        {msg && <p className="small" style={{marginTop:12}}>{msg}</p>}
      </div>
    </section>
  );
}
