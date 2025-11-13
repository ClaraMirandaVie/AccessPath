
import express from "express";
import cors from "cors";
import { db } from "./db.js";
import userRoutes from "./routes/userRoutes.js";
import placeRoutes from "./routes/placeRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/users", userRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/comentarios", commentRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Backend do AccessPath está rodando com usuários, lugares e comentários!");
});

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
