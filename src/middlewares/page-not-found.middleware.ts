import express, { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../errors/not-found.error";

export const pageNotFoundHandler = (app: express.Express) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        next(new NotFoundError("Página não encontrada"));
    });
}