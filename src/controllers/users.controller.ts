import { Request,Response } from "express";
import {getFirestore} from "firebase-admin/firestore"

// type User = {
//     id:number;
//     nome: string;
//     email: string;
// };

export class UsersController{
    static async getAll(req: Request,res: Response){
       try {
                const snapshot = await getFirestore().collection("users").get();
                const users = snapshot.docs.map( doc => {
                    
                    return {
                    id: doc.id,
                    ...doc.data() 
                };
            })
            res.send(users);
        
       } catch (error) {
       res.status(500).send({
        message: "Erro Interno do Servidor"
       });
       }
    }

    static async getById(req: Request,res: Response) {
        try {
            let userId =req.params.id;
            const doc = await getFirestore().collection("users").doc(userId).get();
            res.send({
                id: doc.id,
            ...doc.data()
            });
        } catch (error) {
            res.status(500).send({
             message: "Erro Interno do Servidor"
        });
    }}

    static async save (req: Request,res: Response){
        try {
            let user = req.body;
            const userSalvo = await getFirestore().collection("users").add(user);
             res.status(201).send({
            message: `Usuário ${userSalvo.id} criado com sucesso`});
        } catch (error) {
            res.status(500).send({
                message: "Erro Interno do Servidor"
            });  
        }
        
    }

static async update(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.id;
            const user = req.body;

            if (!userId) {
                res.status(400).json({ message: "ID do usuário é obrigatório" });
                return;
            }

            const userRef = getFirestore().collection("users").doc(userId);
            const doc = await userRef.get();

            if (!doc.exists) {
                res.status(404).json({ message: "Usuário não encontrado" });
                return;
            }

            await userRef.update({
                nome: user.nome,
                email: user.email
            });

            res.json({ 
                message: "Usuário alterado com sucesso",
                userId: userId
            });

        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            res.status(500).json({ message: "Erro Interno do Servidor" });
        }
    }

    static async delete (req: Request,res: Response){
        try {
             let  userId = req.params.id;
        await getFirestore().collection("users").doc(userId).delete();
        res.status(204).send();
        } catch (error) {
            res.status(500).send({
                message: "Erro Interno do Servidor"
            }); 
        }
       
    }
}