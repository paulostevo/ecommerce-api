import express from "express";
import "dotenv/config";
import { initializeApp } from 'firebase-admin/app';
import {routes} from "./routes/index";

initializeApp();
const app = express();

routes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});