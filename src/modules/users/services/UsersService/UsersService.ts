import { User } from "../../domain/Users";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { IUsersRepository } from "../../repository/IUsersRepository";

export class UsersService {
  private usersRepository;

  constructor(usersRepositoy: IUsersRepository) {
    this.usersRepository = usersRepositoy;
  }

  async create(data: CreateUserDTO) {
    const documentAlreadyExists = await this.usersRepository.getUserByDocument(
      data.document
    );

    if (documentAlreadyExists) {
      return { error: `user document [${data.document}] already exists!` };
    }

    const emailAlreadyExists = await this.usersRepository.getUserByEmail(
      data.email
    );

    if (emailAlreadyExists) {
      return { error: `user email [${data.email}] already exists!` };
    }

    const user = User.create(data);

    if (Array.isArray(user)) {
      return user.map((error) => error);
    }

    this.usersRepository.save(user);
  }

  async findById(id: string) {
    return await this.usersRepository.getUserById(id);
  }

  async findByDocument(document: string) {
    return await this.usersRepository.getUserByDocument(document);
  }
}
