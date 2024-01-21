import { User } from "../domain/Users";
import { CreateUserDTO } from "../dtos/CreateUserDTO";

export interface IUsersRepository {
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserByDocument(document: string): Promise<User | null>;
  listAllUsers(): Promise<User[]>;
  save(user: CreateUserDTO): Promise<void>;
}
