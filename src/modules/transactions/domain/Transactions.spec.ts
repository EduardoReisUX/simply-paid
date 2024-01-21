import { describe, expect, it } from "vitest";
import { ITransaction, Transaction } from "./Transactions";

describe("Transactions entity", () => {
  it("should create a transaction", () => {
    const data = {
      amount: "19.90",
      date: new Date(),
      status: "success",
      sender_id: "19.90",
      receiver_id: "19.90",
    } as ITransaction;

    const result = Transaction.create(data) as Transaction;

    expect(result).toHaveProperty("transaction_id");
    expect(result).toHaveProperty("sender_id");
    expect(result).toHaveProperty("receiver_id");
    expect(result).toHaveProperty("amount");
    expect(result).toHaveProperty("date");
    expect(result).toHaveProperty("status");
    expect(result.refunded_date).toBe(null);
  });

  it("should not create a transaction given invalid amount format", () => {
    const data = {
      amount: "asdf",
      date: new Date(),
      status: "refunded",
      sender_id: "19.90",
      receiver_id: "19.90",
    } as ITransaction;

    const result = Transaction.create(data);

    expect(result).toStrictEqual([
      {
        name: "InvalidFormatError",
        message: `The transacation amount [asdf] must be a valid number`,
      },
    ]);
  });
});
