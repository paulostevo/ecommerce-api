import { User } from "../models/users.model";
import { NotFoundError } from "../errors/not-found.error";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "./auth.service";

export class UserService {

    private userRepository: UserRepository;
    private authService: AuthService;

    constructor() {
        this.userRepository = new UserRepository();
        this.authService = new AuthService();
    }

    async getAll(): Promise<User[]> {
       return await this.userRepository.getAll();
    }

    async getById(id: string): Promise<User> {
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new NotFoundError(`Usuário com id ${id} não encontrado`);
        } 
        return user;
    }

    async save(user: User): Promise<void> {
         const userAuth = await this.authService.create(user);
         user.id = userAuth.uid; // Set the user ID from Firebase Auth
         await this.userRepository.update(user);
    }

    async update(id: string, user: User): Promise<void>{

        const _user = await this.userRepository.getById(id);
        if (!_user) {
            throw new NotFoundError(`Usuário com id ${id} não encontrado`);
        }
        _user.nome = user.nome;
        _user.email = user.email;
        
        this.userRepository.update(_user);
            
    }

    async delete(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}
        