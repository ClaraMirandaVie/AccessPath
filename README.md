## 🌐 AccessPath
Aplicação web desenvolvida para o Trabalho de Conclusão de Curso com foco em acessibilidade urbana e mobilidade inclusiva. O AccessPath permite que usuários e administradores mapeiem, avaliem e comentem locais acessíveis, utilizando um mapa interativo baseado no OpenStreetMap.

🚀 Tecnologias utilizadas
Frontend:
React (Vite)
Axios
React Router DOM
React Leaflet + Leaflet
CSS tradicional (com modo escuro )

Backend:
Node.js + Express
MySQL
CORS
(opcional) Nodemon para ambiente de desenvolvimento

⚙️ Como executar o projeto localmente
Observação: a pasta node_modules não está incluída no repositório. Após clonar o projeto, é necessário instalar as dependências localmente.

🖥️ 1. Clonar o repositório
git clone https://github.com/teu-usuario/accesspath.git

📂 2. Entrar na pasta do projeto
cd accesspath

🔹 Backend
Entrar na pasta do backend:
cd backend

Instalar as dependências:
npm install

Configurar o banco de dados MySQL:

Criar um banco chamado accesspath.

Executar o script SQL disponível em backend/database.sql (se incluído).

Iniciar o servidor backend:
npm start

O servidor iniciará na porta padrão 8800. Opcionalmente, para reinício automático durante o desenvolvimento:
npx nodemon index.js

🔹 Frontend

Em outra janela do terminal, entrar na pasta do frontend:
cd ../frontend

Instalar as dependências:
npm install

Iniciar o ambiente de desenvolvimento:
npm run dev

Abrir no navegador o link mostrado (geralmente: http://localhost:5173/)
