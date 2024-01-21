import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { IUsersRepository } from "../../repository/IUsersRepository";

export class UsersService {
  private usersRepository;

  constructor(usersRepositoy: IUsersRepository) {
    this.usersRepository = usersRepositoy;
  }

  async create(user: CreateUserDTO) {
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
