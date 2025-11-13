🌐 AccessPath
Aplicação web desenvolvida para o Trabalho de Conclusão de Curso com foco em acessibilidade urbana e mobilidade inclusiva.
O AccessPath permite que usuários e administradores mapeiem, avaliem e comentem locais acessíveis, utilizando um mapa interativo baseado no OpenStreetMap.

---

## Tecnologias utilizadas
Frontend:
* React (Vite)
* Axios
* React Router DOM
* React Leaflet + Leaflet
* CSS tradicional (com modo escuro)

Backend:
* Node.js + Express
* MySQL
* CORS
* (opcional) Nodemon para ambiente de desenvolvimento

---

## Como executar o projeto localmente
1. Clonar o repositório
```bash
git clone https://github.com/teu-usuario/accesspath.git
```
2. Entrar nas pastas
```bash
cd accesspath
```

Backend:
1. Entrar na pasta `backend`
```bash
cd backend
```
2. Instalar dependências
```bash
npm install
```
3. Configurar o banco de dados MySQL

   * Criar um banco chamado `accesspath`
   * Executar o script SQL disponível em `backend/database.sql` (se tu for incluir ele)
4. Iniciar o servidor backend
```bash
npm start
```
> O servidor iniciará por padrão na porta `8800`.
---

Frontend:
1. Em outra janela do terminal, entrar na pasta `frontend`
```bash
cd ../frontend
```
2. Instalar dependências
```bash
npm install
```
3. Iniciar o ambiente de desenvolvimento
```bash
npm run dev
```
4. Abrir no navegador o link mostrado (geralmente: `http://localhost:5173/`)

---

## Recursos principais
* Mapa interativo com locais acessíveis
* Comentários em formato de “posts” (estilo rede social)
* Cadastro e login de usuários
* Sistema de administração para cadastrar novos locais
* Interface moderna com modo escuro
