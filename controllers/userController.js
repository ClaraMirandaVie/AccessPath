import { db } from "../db.js";

// --- CRIAR NOVO USUÁRIO ---
export const createUser = (req, res) => {
  const { nome, email, senha, tipo } = req.body;
  const sql = "INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)";
  db.query(sql, [nome, email, senha, tipo || "comum"], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  });
};

// --- LISTAR TODOS OS USUÁRIOS ---
export const getUsers = (req, res) => {
  const sql = "SELECT id, nome, email, tipo FROM usuarios";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// --- LOGIN ---
export const loginUser = (req, res) => {
  const { email, senha } = req.body;
  const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
  db.query(sql, [email, senha], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(401).json({ message: "E-mail ou senha incorretos" });
    res.json({
      message: "Login realizado com sucesso",
      user: {
        id: results[0].id,
        nome: results[0].nome,
        email: results[0].email,
        tipo: results[0].tipo
      }
    });
  });
};

// --- EDITAR USUÁRIO ---
export const updateUser = (req, res) => {
  const { id } = req.params;
  const { nome, senha, tipo } = req.body;
  const sql = "UPDATE usuarios SET nome = ?, senha = ?, tipo = ? WHERE id = ?";
  db.query(sql, [nome, senha, tipo, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Usuário atualizado com sucesso!" });
  });
};

// --- DELETAR USUÁRIO ---
export const deleteUser = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM usuarios WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Usuário deletado com sucesso!" });
  });
};
