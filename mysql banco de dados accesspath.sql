CREATE DATABASE accesspath;
USE accesspath;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(100) NOT NULL,
  tipo ENUM('comum', 'admin') DEFAULT 'comum'
);

CREATE TABLE estabelecimentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  endereco VARCHAR(200),
  descricao TEXT,
  acessibilidade TEXT,
  criado_por INT,
  FOREIGN KEY (criado_por) REFERENCES usuarios(id)
);

CREATE TABLE comentarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  texto TEXT NOT NULL,
  avaliacao INT CHECK (avaliacao BETWEEN 1 AND 5),
  data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usuario_id INT,
  estabelecimento_id INT,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (estabelecimento_id) REFERENCES estabelecimentos(id)
);

INSERT INTO usuarios (nome, email, senha, tipo)
VALUES ('Admin AccessPath', 'admin@accesspath.com', '1234', 'admin');

SHOW TABLES;

DESCRIBE usuarios;
DESCRIBE estabelecimentos;
DESCRIBE comentarios;

