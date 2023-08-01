import express from "express";
const app = express();

// cors = política para facilitar comunicação de cliente e servidor
import cors from "cors";
app.use(cors());

// funcionalidade nativa do express para parsear o body da requisição
app.use(express.json());

import db from "./config/database.js";
db.connect();

import routes from "./routes/userRoutes.js";

//definir uma rota principal pro meu projeto
app.use("/users", routes);

export default app;

