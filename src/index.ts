import express from "express";
import "dotenv/config";
import { initializeApp } from 'firebase-admin/app';
import {routes} from "./routes/index";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { pageNotFoundHandler } from "./middlewares/page-not-found.middleware";
initializeApp();
const app = express();

routes(app);
pageNotFoundHandler(app);
// Error handler must be the last middleware
errorHandler(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});