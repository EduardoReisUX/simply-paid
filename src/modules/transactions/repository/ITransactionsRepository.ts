import { Transaction } from "../domain/Transactions";

export interface ITransactionRepository {
  findTransactionById(id: string): Promise<Transaction | null>;
  findTransactionBySenderDocument(
    sender_id: string
  ): Promise<Transaction | undefined>;
  findTransactionByReceiverDocument(
    receiver_id: string
  ): Promise<Transaction | undefined>;
  listAllTransactions(): Promise<Transaction[]>;
  save(transaction: Transaction): Promise<void>;
}
