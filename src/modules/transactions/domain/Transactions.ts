import { Result } from "../../../shared/Result";

export interface ITransaction {
  amount: string;
  date?: Date;
  status?: "success" | "refunded";
  sender_id: string;
  receiver_id: string;
}

export class Transaction {
  transaction_id;
  amount;
  date;
  status;
  refunded_date;
  sender_id;
  receiver_id;

  private constructor(transaction: ITransaction) {
    this.transaction_id = crypto.randomUUID();
    this.amount = transaction.amount;
    this.date = transaction.date ? transaction.date : new Date();
    this.status = transaction.status ? transaction.status : "success";
    this.refunded_date = this.status === "success" ? null : new Date();
    this.sender_id = transaction.sender_id;
    this.receiver_id = transaction.receiver_id;
  }

  public static create(transaction: ITransaction) {
    const amount = this.validateAmount(transaction.amount);

    if (!amount.isValid) {
      return Result.fail<Transaction>(amount.errors);
    }

    return Result.ok<Transaction>(new Transaction(transaction));
  }

  private static validateAmount(amount: string) {
    const errors = [];

    if (isNaN(Number(amount))) {
      errors.push(
        `InvalidFormatError: The transaction amount [${amount}] must be a valid number`
      );
    }

    return { errors, isValid: !errors.length };
  }
}
