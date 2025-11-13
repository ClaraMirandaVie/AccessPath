
import { db } from "../db.js";

// Criar comentário
export const createComment = (req, res) => {
  const { texto, avaliacao, usuario_id, estabelecimento_id } = req.body;
  const sql = "INSERT INTO comentarios (texto, avaliacao, usuario_id, estabelecimento_id) VALUES (?, ?, ?, ?)";
  db.query(sql, [texto, avaliacao || 5, usuario_id, estabelecimento_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Comentário adicionado com sucesso!", id: result.insertId });
  });
};

// Listar comentários — opcionalmente por placeId (query param ?placeId=)
export const getComments = (req, res) => {
  const { placeId } = req.query;
  let sql = `
    SELECT c.*, u.nome AS nome_usuario
    FROM comentarios c
    LEFT JOIN usuarios u ON c.usuario_id = u.id
  `;
  const params = [];
  if (placeId) {
    sql += " WHERE c.estabelecimento_id = ? ";
    params.push(placeId);
  }
  sql += " ORDER BY c.data DESC";
  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Deletar comentário (pode ser usado pelo admin)
export const deleteComment = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM comentarios WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Comentário removido com sucesso!" });
  });
};
