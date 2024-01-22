import { Transaction } from "../../domain/Transactions";
import { ITransactionRepository } from "../ITransactionsRepository";

export class TransactionsRepositoryInMemory implements ITransactionRepository {
  transactions: Transaction[];

  constructor(transactions: Transaction[]) {
    this.transactions = transactions;
  }

  async save(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
  }

  async findTransactionById(id: string): Promise<Transaction | null> {
    return (
      this.transactions.find(
        (transaction) => transaction.transaction_id === id
      ) || null
    );
  }
  async findTransactionBySenderId(
    sender_id: string
  ): Promise<Transaction | null> {
    return (
      this.transactions.find(
        (transaction) => transaction.sender_id === sender_id
      ) || null
    );
  }

  async findTransactionByReceiverId(
    receiver_id: string
  ): Promise<Transaction | null> {
    return (
      this.transactions.find(
        (transaction) => transaction.receiver_id === receiver_id
      ) || null
    );
  }

  async listAllTransactions(): Promise<Transaction[]> {
    return this.transactions;
  }
}
