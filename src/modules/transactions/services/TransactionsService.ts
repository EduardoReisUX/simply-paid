import { UsersService } from "../../users/services/UsersService/UsersService";
import { Transaction } from "../domain/Transactions";
import { CreateTransactionDTO } from "../dtos/CreateTransaction";
import { ITransactionRepository } from "../repository/ITransactionsRepository";

export class TransactionsService {
  private transactionsRepository: ITransactionRepository;
  private usersService: UsersService;

  constructor(
    transactionsRepository: ITransactionRepository,
    usersService: UsersService
  ) {
    this.transactionsRepository = transactionsRepository;
    this.usersService = usersService;
  }

  async createTransaction({
    sender_document,
    receiver_document,
    amount,
  }: CreateTransactionDTO) {
    const sender = await this.usersService.findByDocument(sender_document);

    if (!sender) {
      return { error: "Sender not found!" };
    }

    const receiver = await this.usersService.findByDocument(receiver_document);

    if (!receiver) {
      return { error: "Receiver not found!" };
    }

    if (sender.role === "shopkeeper") {
      return { error: `Shopkeepers [${sender.name}] can't transfer funds!` };
    }

    if (sender.funds < Number(amount)) {
      return {
        error: `Sender [${sender.name}] does not have sufficient funds!`,
      };
    }

    const transaction = Transaction.create({
      receiver_id: receiver.id,
      sender_id: sender.id,
      amount,
    });

    if (Array.isArray(transaction)) {
      return transaction.map((error) => error);
    }

    this.transactionsRepository.save(transaction);
  }
}
