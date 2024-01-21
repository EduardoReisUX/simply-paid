export interface ITransaction {
  amount: string;
  date: Date;
  status: "success" | "refunded";
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
    this.date = transaction.date;
    this.status = transaction.status;
    this.refunded_date = this.status === "success" ? null : new Date();
    this.sender_id = transaction.sender_id;
    this.receiver_id = transaction.receiver_id;
  }

  public static create(transaction: ITransaction) {
    const status = this.validateAmount(transaction.amount);

    if (!status.isValid) {
      return status.errors;
    }

    return new Transaction(transaction);
  }

  private static validateAmount(amount: string) {
    const errors = [];

    if (isNaN(Number(amount))) {
      errors.push({
        name: "InvalidFormatError",
        message: `The transacation amount [${amount}] must be a valid number`,
      });
    }

    return { errors, isValid: !errors.length };
  }
}
