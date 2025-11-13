import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/api/users/login", { email, senha });
      localStorage.setItem("ap_user", JSON.stringify(res.data.user));
      setMsg(`Bem-vindo(a) ${res.data.user.nome}`);
    } catch (err) {
      setMsg("E-mail ou senha incorretos");
    }
  };

  return (
    <section className="auth-wrap fade-up">
      <div className="card" style={{maxWidth:420, margin:"2rem auto"}}>
        <h2>Entrar</h2>
        <form onSubmit={submit} style={{marginTop:12}}>
          <input className="input" type="email" placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input className="input" type="password" placeholder="Senha" value={senha} onChange={e=>setSenha(e.target.value)} required />
          <div style={{display:"flex", gap:10, marginTop:12}}>
            <button className="btn" type="submit">Entrar</button>
            <button className="btn ghost" type="button" onClick={() => {setEmail("admin@accesspath.com"); setSenha("1234");}}>Preencher teste</button>
          </div>
        </form>
        {msg && <p className="small" style={{marginTop:12}}>{msg}</p>}
      </div>
    </section>
  );
}
