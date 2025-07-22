import express from "express";
import { UsersController } from "../controllers/users.controller";
export const userRoutes = express.Router();
import asyncHanler from "express-async-handler";

userRoutes.get("/users", asyncHanler(UsersController.getAll));
userRoutes.get("/users/:id",asyncHanler(UsersController.getById));
userRoutes.post("/users",asyncHanler(UsersController.save));
userRoutes.put("/users/:id",asyncHanler(UsersController.update));
userRoutes.delete("/users/:id",asyncHanler(UsersController.delete));

