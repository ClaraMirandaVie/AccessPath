import { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";

export default function Admin() {
  const [places, setPlaces] = useState([]);
  const [novo, setNovo] = useState({
    nome: "",
    endereco: "",
    descricao: "",
    acessibilidade: "",
    criado_por: 1,
  });

  const buscarLocais = async () => {
    const res = await axios.get("http://localhost:8800/api/places");
    setPlaces(res.data);
  };

  const adicionarLocal = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8800/api/places", novo);
    setNovo({ nome: "", endereco: "", descricao: "", acessibilidade: "" , criado_por: 1});
    buscarLocais();
  };

  useEffect(() => { buscarLocais(); }, []);

  return (
    <main className="admin-container">
      <h2>Gerenciar Estabelecimentos</h2>

      <form onSubmit={adicionarLocal} className="admin-form">
        <input type="text" placeholder="Nome" value={novo.nome} onChange={(e)=>setNovo({...novo, nome:e.target.value})} required />
        <input type="text" placeholder="Endereço" value={novo.endereco} onChange={(e)=>setNovo({...novo, endereco:e.target.value})} />
        <textarea placeholder="Descrição" value={novo.descricao} onChange={(e)=>setNovo({...novo, descricao:e.target.value})} />
        <textarea placeholder="Acessibilidade" value={novo.acessibilidade} onChange={(e)=>setNovo({...novo, acessibilidade:e.target.value})} />
        <button type="submit">Adicionar Local</button>
      </form>

      <section className="place-list">
        {places.map((p) => (
          <div key={p.id} className="place-card card">
            <h3>{p.nome}</h3>
            <p><strong>Endereço:</strong> {p.endereco}</p>
            <p>{p.descricao}</p>
            <small>{p.acessibilidade}</small>
          </div>
        ))}
      </section>
    </main>
  );
}
