import { User } from "../domain/Users";

export interface IUsersRepository {
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserByDocument(document: string): Promise<User | null>;
  listAllUsers(): Promise<User[]>;
  save(user: User): Promise<void>;
}
