import { beforeAll, describe, expect, it } from "vitest";
import { UsersRepositoryInMemory } from "./../../repository/InMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "./../CreateUserUseCase/CreateUserUseCase";
import { IUser } from "../../core/Users";

describe("Create user use case", () => {
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let createUserUseCase: CreateUserUseCase;

  beforeAll(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory([]);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should create a user", async () => {
    const data = {
      name: "dudu",
      lastname: "dos reis",
      document: "777",
      email: "asd@.com",
      password: "asd3",
      role: "common",
    } as IUser;

    const result = await createUserUseCase.execute(data);

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
    } as IUser;

    const result = await createUserUseCase.execute(data);

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
    } as IUser;

    const result = await createUserUseCase.execute(data);

    expect(result).toStrictEqual({
      error: "user document [777] already exists!",
    });
  });
});
