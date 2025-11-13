
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./MapPage.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// fix default marker icon paths for many builds
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function PlaceComments({ placeId }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    let mounted = true;
    axios.get(`http://localhost:8800/api/comentarios?placeId=${placeId}`)
      .then(res => { if (mounted) setComments(res.data); })
      .catch(() => {});
    return () => (mounted = false);
  }, [placeId]);

  if (!comments || comments.length === 0) return <p className="small">Seja o primeiro a comentar!</p>;
  return comments.map(c => (
    <div key={c.id} className="comment-row">
      <div className="avatar-small">👤</div>
      <div>
        <div className="comment-author">{c.nome_usuario || "Usuário"}</div>
        <div className="comment-text">{c.texto}</div>
        <div className="comment-meta small">{new Date(c.data).toLocaleString()}</div>
      </div>
    </div>
  ));
}

export default function Map() {
  const [places, setPlaces] = useState([]);
  const [center, setCenter] = useState([ -29.765, -51.144 ]); // default (ex: São Leopoldo coords aproximadas)
  const [zoom, setZoom] = useState(13);
  const [commentText, setCommentText] = useState({});
  const [rating, setRating] = useState({});
  const user = JSON.parse(localStorage.getItem("ap_user") || "null");
  const feedRef = useRef(null);

  const fetchPlaces = async () => {
    const res = await axios.get("http://localhost:8800/api/places");
    // optional: if places contain lat/lng use them to center; otherwise keep default
    setPlaces(res.data);
  };

  useEffect(() => { fetchPlaces(); }, []);

  // envia comentário
  const submitComment = async (e, placeId) => {
    e.preventDefault();
    const texto = commentText[placeId];
    if (!texto || !texto.trim()) return;
    const payload = {
      texto,
      avaliacao: rating[placeId] || 5,
      usuario_id: user ? user.id : null,
      estabelecimento_id: placeId
    };
    try {
      await axios.post("http://localhost:8800/api/comentarios", payload);
      setCommentText({ ...commentText, [placeId]: "" });
      setRating({ ...rating, [placeId]: 5 });
      await fetchPlaces();
      // optional: scroll to place card
      const el = document.getElementById(`place-${placeId}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (err) {
      alert("Erro ao enviar comentário.");
    }
  };

  return (
    <section className="map-page">
      <h2>Mapa de Locais Acessíveis</h2>

      <div className="map-layout">
        <div className="map-box card">
          <MapContainer center={center} zoom={zoom} style={{ height: 400, borderRadius: 12 }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {places.map(pl => {
              // se tua tabela tiver lat/lng, use: [pl.lat, pl.lng]
              // aqui assumimos que não tem e deixamos apenas popup
              return (
                <Marker key={pl.id} position={pl.lat && pl.lng ? [pl.lat, pl.lng] : [center[0], center[1]]}>
                  <Popup>
                    <div style={{minWidth:200}}>
                      <strong>{pl.nome}</strong><br />
                      <div className="small">{pl.endereco}</div>
                      <div style={{marginTop:8}}>
                        <a href={`#place-${pl.id}`} onClick={() => { const el = document.getElementById(`place-${pl.id}`); if(el) el.scrollIntoView({behavior:"smooth", block:"center"}); }}>Ver post</a>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        <div className="feed-box" ref={feedRef}>
          <h3>Feed</h3>
          <div className="feed">
            {places.map(place => (
              <article id={`place-${place.id}`} className="place-post card" key={place.id}>
                <header className="post-header">
                  <div className="avatar">🏛️</div>
                  <div>
                    <h3>{place.nome}</h3>
                    <div className="small">{place.endereco}</div>
                    <div className="small">Cadastrado por: {place.criado_por_nome || "—"}</div>
                  </div>
                </header>

                <div className="post-body">
                  <p>{place.descricao}</p>
                  <div className="tag small">Acessibilidade: {place.acessibilidade}</div>
                </div>

                <section className="post-comments">
                  <h4>Comentários</h4>
                  <div className="comments-list">
                    <PlaceComments placeId={place.id} />
                  </div>

                  <form className="comment-form" onSubmit={(e)=>submitComment(e, place.id)}>
                    <input
                      className="input"
                      placeholder={user ? "Escreva um comentário..." : "Faça login para comentar"}
                      value={commentText[place.id] || ""}
                      onChange={(e)=> setCommentText({...commentText, [place.id]: e.target.value})}
                      disabled={!user}
                    />
                    <div style={{display:"flex", gap:8, marginTop:8}}>
                      <select
                        className="input"
                        style={{width:120}}
                        value={rating[place.id] || 5}
                        onChange={(e)=> setRating({...rating, [place.id]: Number(e.target.value)})}
                        disabled={!user}
                      >
                        <option value={5}>5 ★</option>
                        <option value={4}>4 ★</option>
                        <option value={3}>3 ★</option>
                        <option value={2}>2 ★</option>
                        <option value={1}>1 ★</option>
                      </select>

                      <button className="btn" disabled={!user} style={{marginLeft:"auto"}}>Enviar</button>
                    </div>
                  </form>
                </section>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
