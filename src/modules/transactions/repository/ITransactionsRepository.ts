import { Transaction } from "../domain/Transactions";

export interface ITransactionRepository {
  findTransactionById(id: string): Promise<Transaction | null>;
  findTransactionBySenderId(sender_id: string): Promise<Transaction | null>;
  findTransactionByReceiverId(receiver_id: string): Promise<Transaction | null>;
  listAllTransactions(): Promise<Transaction[]>;
  save(transaction: Transaction): Promise<void>;
}
