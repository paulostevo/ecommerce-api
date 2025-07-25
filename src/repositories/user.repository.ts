import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { User } from "../models/users.model";

export class UserRepository {

    private collection : CollectionReference;
    constructor() {
        this.collection = getFirestore().collection("users");
    }   

    async getAll(): Promise<User[]> {
         const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            } as User;
        });
    }

    async getById(id: string): Promise<User | null> {
        const doc = await this.collection.doc(id).get();
        if (doc.exists) {
            return {
                id: doc.id,
                ...doc.data()
            } as User;
        } else {
            return null;
        }
    }

    async save(user: User): Promise<void> {
         await this.collection.add(user);
    }

    async update(user: User): Promise<void> {
        let docRef =  this.collection.doc(user.id);
         await docRef.update({
                         nome: user.nome,
                         email: user.email
                        }); 
           
    }

    async delete(id: string): Promise<void> {
        await this.collection.doc(id).delete();

    }

}

