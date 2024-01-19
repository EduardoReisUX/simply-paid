import { User } from "../../core/Users";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
  users: User[];

  constructor(users: User[]) {
    this.users = users;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async getUserByDocument(document: string): Promise<User | null> {
    return this.users.find((user) => user.document === document) || null;
  }

  async listAllUsers(): Promise<User[]> {
    return this.users;
  }
}
