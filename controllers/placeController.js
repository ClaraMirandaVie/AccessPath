
import { db } from "../db.js";

// Criar estabelecimento
export const createPlace = (req, res) => {
  const { nome, endereco, descricao, acessibilidade, criado_por } = req.body;
  const sql =
    "INSERT INTO estabelecimentos (nome, endereco, descricao, acessibilidade, criado_por) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [nome, endereco, descricao, acessibilidade, criado_por], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Estabelecimento cadastrado com sucesso!", id: result.insertId });
  });
};

// Listar todos os estabelecimentos (com nome do criador)
export const getPlaces = (req, res) => {
  const sql = `
    SELECT e.*, u.nome AS criado_por_nome
    FROM estabelecimentos e
    LEFT JOIN usuarios u ON e.criado_por = u.id
    ORDER BY e.id DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Buscar 1 estabelecimento por id
export const getPlaceById = (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT e.*, u.nome AS criado_por_nome
    FROM estabelecimentos e
    LEFT JOIN usuarios u ON e.criado_por = u.id
    WHERE e.id = ?
  `;
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: "Estabelecimento não encontrado" });
    res.json(results[0]);
  });
};

// Atualizar estabelecimento
export const updatePlace = (req, res) => {
  const { id } = req.params;
  const { nome, endereco, descricao, acessibilidade } = req.body;
  const sql =
    "UPDATE estabelecimentos SET nome = ?, endereco = ?, descricao = ?, acessibilidade = ? WHERE id = ?";
  db.query(sql, [nome, endereco, descricao, acessibilidade, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Estabelecimento atualizado com sucesso!" });
  });
};

// Deletar estabelecimento
export const deletePlace = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM estabelecimentos WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Estabelecimento removido com sucesso!" });
  });
};
