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
  async findTransactionBySenderDocument(
    sender_document: string
  ): Promise<Transaction | undefined> {
    return this.transactions.find(
      (transaction) => transaction.sender_document === sender_document
    );
  }

  async findTransactionByReceiverDocument(
    receiver_document: string
  ): Promise<Transaction | undefined> {
    return this.transactions.find(
      (transaction) => transaction.receiver_document === receiver_document
    );
  }

  async listAllTransactions(): Promise<Transaction[]> {
    return this.transactions;
  }
}
