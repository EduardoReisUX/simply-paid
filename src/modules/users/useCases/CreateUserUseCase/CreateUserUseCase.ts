import { IUser, User } from "../../core/Users";
import { IUsersRepository } from "../../repository/IUsersRepository";

export class CreateUserUseCase {
  private usersRepository;

  constructor(usersRepositoy: IUsersRepository) {
    this.usersRepository = usersRepositoy;
  }

  async execute(user: IUser) {
    const documentAlreadyExists = await this.usersRepository.getUserByDocument(
      user.document
    );

    if (documentAlreadyExists) {
      return { error: `user document [${user.document}] already exists!` };
    }

    const emailAlreadyExists = await this.usersRepository.getUserByEmail(
      user.email
    );

    if (emailAlreadyExists) {
      return { error: `user email [${user.email}] already exists!` };
    }

    this.usersRepository.save(user);
  }
}
