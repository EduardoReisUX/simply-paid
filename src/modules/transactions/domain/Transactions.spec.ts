import { describe, expect, it } from "vitest";
import { ITransaction, Transaction } from "./Transactions";

describe("Transactions entity", () => {
  it("should create a transaction", () => {
    const data = {
      amount: "19.90",
      date: new Date(),
      status: "success",
      sender_document: "19.90",
      receiver_document: "19.90",
    } as ITransaction;

    const result = Transaction.create(data);
    const transaction = result.getValue();

    expect(transaction).toHaveProperty("transaction_id");
    expect(transaction).toHaveProperty("sender_document");
    expect(transaction).toHaveProperty("receiver_document");
    expect(transaction).toHaveProperty("amount");
    expect(transaction).toHaveProperty("date");
    expect(transaction).toHaveProperty("status");
    expect(transaction.refunded_date).toBe(null);
  });

  it("should not create a transaction given invalid amount format", () => {
    const data = {
      amount: "asdf",
      date: new Date(),
      status: "refunded",
      sender_document: "19.90",
      receiver_document: "19.90",
    } as ITransaction;

    const result = Transaction.create(data);

    expect(result.errors).toStrictEqual([
      `InvalidFormatError: The transaction amount [asdf] must be a valid number`,
    ]);
  });
});
