import { beforeAll, describe, expect, it } from "vitest";
import { UsersRepositoryInMemory } from "./../../repository/InMemory/UsersRepositoryInMemory";
import { UsersService } from "./../UsersService/UsersService";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";

describe("Users service", () => {
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let usersService: UsersService;

  beforeAll(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory([]);
    usersService = new UsersService(usersRepositoryInMemory);
  });

  it("should create a user", async () => {
    const data = {
      name: "dudu",
      lastname: "dos reis",
      document: "777",
      email: "asd@.com",
      password: "asd3",
      role: "common",
    } as CreateUserDTO;

    const result = await usersService.create(data);

    expect(result).toBeUndefined();
  });

  it("should not create a user given email already exists", async () => {
    const data = {
      name: "dudu",
      lastname: "dos reis",
      document: "777888999",
      email: "asd@.com",
      password: "asd3",
      role: "common",
    } as CreateUserDTO;

    const result = await usersService.create(data);

    expect(result).toStrictEqual({
      error: "user email [asd@.com] already exists!",
    });
  });

  it("should not create a user given document already exists", async () => {
    const data = {
      name: "dudu",
      lastname: "dos reis",
      document: "777",
      email: "asd@.com",
      password: "asd3",
      role: "shopkeeper",
    } as CreateUserDTO;

    const result = await usersService.create(data);

    expect(result).toStrictEqual({
      error: "user document [777] already exists!",
    });
  });
});
