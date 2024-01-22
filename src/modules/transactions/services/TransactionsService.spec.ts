import { beforeAll, beforeEach, describe, expect, it } from "vitest";

import { TransactionsRepositoryInMemory } from "../repository/InMemory/TransactionsRepositoryInMemory";
import { TransactionsService } from "./TransactionsService";

import { UsersRepositoryInMemory } from "../../users/repository/InMemory/UsersRepositoryInMemory";
import { UsersService } from "../../users/services/UsersService/UsersService";
import { CreateUserDTO } from "../../users/dtos/CreateUserDTO";

describe("Transactions service", () => {
  let transactionsRepositoryInMemory: TransactionsRepositoryInMemory;
  let transactionServices: TransactionsService;

  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let usersService: UsersService;

  let common_user = {
    name: "dudu",
    lastname: "dos reis",
    email: "unique@email.com",
    password: "dudu",
    document: "12345678910",
    role: "common",
    funds: 20,
  } as CreateUserDTO;

  let shopkeeper_user = {
    name: "empresa",
    lastname: "dos reis",
    email: "unique@dosreis.com",
    password: "dos reis",
    document: "98765432100",
    role: "shopkeeper",
  } as CreateUserDTO;

  beforeAll(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory([]);
    usersService = new UsersService(usersRepositoryInMemory);

    usersService.create(common_user);
    usersService.create(shopkeeper_user);
  });

  beforeEach(() => {
    transactionsRepositoryInMemory = new TransactionsRepositoryInMemory([]);
    transactionServices = new TransactionsService(
      transactionsRepositoryInMemory,
      usersService
    );
  });

  it("should create a transaction given valid data", async () => {
    const data = {
      sender_document: common_user.document,
      receiver_document: shopkeeper_user.document,
      amount: "19.90",
    };

    const result = await transactionServices.createTransaction(data);

    expect(result).toBeUndefined();
  });

  it("should not create a transaction given invalid sender document", async () => {
    const data = {
      sender_document: "invalid",
      receiver_document: shopkeeper_user.document,
      amount: "19.90",
    };

    const result = await transactionServices.createTransaction(data);

    expect(result).toStrictEqual({ error: "Sender not found!" });
  });

  it("should not create a transaction given invalid receiver document", async () => {
    const data = {
      sender_document: common_user.document,
      receiver_document: "invalid",
      amount: "19.90",
    };

    const result = await transactionServices.createTransaction(data);

    expect(result).toStrictEqual({ error: "Receiver not found!" });
  });

  it("should not create a transaction given sender is shopkeeper", async () => {
    const data = {
      sender_document: shopkeeper_user.document,
      receiver_document: common_user.document,
      amount: "19.90",
    };

    const result = await transactionServices.createTransaction(data);

    expect(result).toStrictEqual({
      error: `Shopkeepers [${shopkeeper_user.name}] can't transfer funds!`,
    });
  });

  it("should not create a transaction given sender doesn't have sufficient funds", async () => {
    const data = {
      sender_document: common_user.document,
      receiver_document: shopkeeper_user.document,
      amount: "9999",
    };

    const result = await transactionServices.createTransaction(data);

    expect(result).toStrictEqual({
      error: `Sender [${common_user.name}] does not have sufficient funds!`,
    });
  });

  it("should not create a transaction given data is in invalid format", async () => {
    const data = {
      sender_document: common_user.document,
      receiver_document: shopkeeper_user.document,
      amount: "99a",
    };

    const result = (await transactionServices.createTransaction(data)) as {
      name: string;
      message: string;
    }[];

    result!.forEach((error) => {
      expect(error).toHaveProperty("name");
      expect(error).toHaveProperty("message");
    });
  });
});
