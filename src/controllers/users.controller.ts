import { NextFunction, Request,Response } from "express";
import { UserService } from "../Services/user.service";

export class UsersController{
    static async getAll(req: Request, res: Response, next: NextFunction){
            res.send(await new UserService().getAll());
    }

    static async getById(req: Request,res: Response, next: NextFunction) {
        let userId = req.params.id;
        res.send(await new UserService().getById(userId));
    }

    static async save (req: Request,res: Response, next: NextFunction){
            await new UserService().save(req.body);
            res.status(201).send({
            message: `Usuário criado com sucesso`});
    }

    static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
            const userId = req.params.id;
            const user = req.body;
            await new UserService().update(userId, user);
            res.send({ message: `Usuário atualizado com sucesso` });
    }

    static async delete (req: Request,res: Response, next: NextFunction){
             let  userId = req.params.id;
             await new UserService().delete(userId);
             res.status(204).send();
    }
}