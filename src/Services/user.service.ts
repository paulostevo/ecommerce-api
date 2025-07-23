import { getFirestore } from "firebase-admin/firestore";
import { User } from "../models/users.model";
import { NotFoundError } from "../errors/not-found.error";

export class UserService {
    async getAll(): Promise<User[]> {
        const snapshot = await getFirestore().collection("users").get();
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            } as User;
        });
    }

    async getById(id: string): Promise<User> {
        const doc = await getFirestore().collection("users").doc(id).get();
        if (doc.exists) {
            return {
                id: doc.id,
                ...doc.data()
            } as User;
        } else {
            throw new NotFoundError(`Usuário com id ${id} não encontrado`);
        }
    }

    async save(user: User): Promise<void> {
         await getFirestore().collection("users").add(user);
    }

    async update(id: string, user: User): Promise<void>{
            let docRef =  getFirestore().collection("users").doc(id);

            if((await docRef.get()).exists){
                  await docRef.update({
                         nome: user.nome,
                         email: user.email
                        });
            }else{
                throw new NotFoundError(`Usuário com id ${id} não encontrado`);
            }
    }

    async delete(id: string): Promise<void> {
        await getFirestore().collection("users").doc(id).delete();

    }
}
        