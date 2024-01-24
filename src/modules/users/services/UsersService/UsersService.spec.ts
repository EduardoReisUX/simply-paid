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
      document: "12345678910",
      email: "asd@.com",
      password: "asd3",
      role: "common",
    } as CreateUserDTO;

    const result = await usersService.create(data);

    expect(result.getValue()).toBeUndefined();
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

    expect(result.errors).toStrictEqual([
      "user email [asd@.com] already exists!",
    ]);
  });

  it("should not create a user given document already exists", async () => {
    const data = {
      name: "dudu",
      lastname: "dos reis",
      document: "12345678910",
      email: "asd@.com",
      password: "asd3",
      role: "shopkeeper",
    } as CreateUserDTO;

    const result = await usersService.create(data);

    expect(result.errors).toStrictEqual([
      "user document [12345678910] already exists!",
    ]);
  });

  it("should not create a user given data is in invalid format", async () => {
    const data = {
      name: "dudu",
      lastname: "dos reis",
      document: "asdzxf",
      email: "asd@email.com",
      password: "asd3",
      role: "shopkeeper",
    } as CreateUserDTO;

    const result = await usersService.create(data);

    const expectedErrors = ["InvalidFormatError", "InvalidLengthError"];

    // Check if all errors from result is at leasts 1 of those expected errors
    const hasExpectedErrors = result.errors.every((error) =>
      expectedErrors.some((expected) => error.includes(expected))
    );

    expect(hasExpectedErrors).toBeTruthy();
  });
});
