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

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory([]);
    usersService = new UsersService(usersRepositoryInMemory);
    usersService.create(common_user);
    usersService.create(shopkeeper_user);

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

    expect(result.getValue()).toBeUndefined();
  });

  it("should not create a transaction given invalid sender document", async () => {
    const data = {
      sender_document: "invalid",
      receiver_document: shopkeeper_user.document,
      amount: "19.90",
    };

    const result = await transactionServices.createTransaction(data);

    expect(result.errors).toStrictEqual(["Sender not found!"]);
  });

  it("should not create a transaction given invalid receiver document", async () => {
    const data = {
      sender_document: common_user.document,
      receiver_document: "invalid",
      amount: "19.90",
    };

    const result = await transactionServices.createTransaction(data);

    expect(result.errors).toStrictEqual(["Receiver not found!"]);
  });

  it("should not create a transaction given sender is shopkeeper", async () => {
    const data = {
      sender_document: shopkeeper_user.document,
      receiver_document: common_user.document,
      amount: "19.90",
    };

    const result = await transactionServices.createTransaction(data);

    expect(result.errors).toStrictEqual([
      `Shopkeepers [${shopkeeper_user.name}] can't transfer funds!`,
    ]);
  });

  it("should not create a transaction given sender doesn't have sufficient funds", async () => {
    const data = {
      sender_document: common_user.document,
      receiver_document: shopkeeper_user.document,
      amount: "9999",
    };

    const result = await transactionServices.createTransaction(data);

    expect(result.errors).toStrictEqual([
      `Sender [${common_user.name}] does not have sufficient funds!`,
    ]);
  });

  it("should not create a transaction given data is in invalid format", async () => {
    const data = {
      sender_document: common_user.document,
      receiver_document: shopkeeper_user.document,
      amount: "99a",
    };

    const result = await transactionServices.createTransaction(data);

    const expectedErrors = ["InvalidFormatError"];

    const hasExpectedErrors = result.errors.every((error) =>
      expectedErrors.some((expect) => error.includes(expect))
    );

    expect(hasExpectedErrors).toBeTruthy();
  });

  it("should update sender and receiver funds after creating a transaction", async () => {
    const data = {
      sender_document: common_user.document,
      receiver_document: shopkeeper_user.document,
      amount: "19.90",
    };

    await transactionServices.createTransaction(data);

    const sender = await usersService.findByDocument("12345678910");
    const receiver = await usersService.findByDocument("98765432100");
    const transaction = await transactionServices.findBySenderDocument(
      "12345678910"
    );

    /* 20 - 19.90 = 0.10 */
    expect(sender.getValue().funds).toBe("0.10");
    expect(receiver.getValue().funds).toBe("19.90");
    expect(transaction.getValue().amount).toBe("19.90");
  });
});
