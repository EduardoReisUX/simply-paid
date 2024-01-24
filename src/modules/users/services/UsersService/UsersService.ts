import { Result } from "../../../../shared/Result";
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
      return Result.fail([`user document [${data.document}] already exists!`]);
    }

    const emailAlreadyExists = await this.usersRepository.getUserByEmail(
      data.email
    );

    if (emailAlreadyExists) {
      return Result.fail([`user email [${data.email}] already exists!`]);
    }

    const userOrError = User.create(data);

    if (userOrError.isFailure) {
      return Result.fail(userOrError.errors.map((error) => error));
    }

    const user = userOrError.getValue();

    return Result.ok(await this.usersRepository.save(user));
  }

  async findById(id: string) {
    const user = await this.usersRepository.getUserById(id);

    if (!user) {
      return Result.fail<User>([
        "UsersService.findById: Could not find user by ID!",
      ]);
    }

    return Result.ok<User>(user);
  }

  async findByDocument(document: string) {
    const user = await this.usersRepository.getUserByDocument(document);

    if (!user) {
      return Result.fail<User>([
        `UsersService.findById: Could not find user by document [${document}]!`,
      ]);
    }

    return Result.ok<User>(user);
  }
}
