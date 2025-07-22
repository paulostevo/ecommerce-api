import express from "express";
import { UsersController } from "../controllers/users.controller";
export const userRoutes = express.Router();
import asyncHanler from "express-async-handler";
import { celebrate, Segments } from "celebrate";
import { userSchema } from "../models/users.model";

userRoutes.get("/users", asyncHanler(UsersController.getAll));
userRoutes.get("/users/:id",asyncHanler(UsersController.getById));
userRoutes.post("/users",celebrate({[Segments.BODY]: userSchema}), asyncHanler(UsersController.save));
userRoutes.put("/users/:id",celebrate({[Segments.BODY]: userSchema}),asyncHanler(UsersController.update));
userRoutes.delete("/users/:id",asyncHanler(UsersController.delete));

