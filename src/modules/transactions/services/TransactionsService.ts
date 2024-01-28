import { Result } from "../../../shared/Result";
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
    const senderOrError = await this.usersService.findByDocument(
      sender_document
    );

    if (senderOrError.isFailure) {
      return Result.fail(["Sender not found!"]);
    }

    const sender = senderOrError.getValue();

    const receiverOrError = await this.usersService.findByDocument(
      receiver_document
    );

    if (receiverOrError.isFailure) {
      return Result.fail(["Receiver not found!"]);
    }

    const receiver = receiverOrError.getValue();

    if (sender.role === "shopkeeper") {
      return Result.fail([
        `Shopkeepers [${sender.name}] can't transfer funds!`,
      ]);
    }

    if (sender.funds < Number(amount)) {
      return Result.fail([
        `Sender [${sender.name}] does not have sufficient funds!`,
      ]);
    }

    const transactionOrError = Transaction.create({
      receiver_document: receiver.document,
      sender_document: sender.document,
      amount,
    });

    if (transactionOrError.isFailure) {
      return Result.fail(transactionOrError.errors);
    }

    let senderAmount = parseFloat(sender.funds);
    let receiverAmount = parseFloat(receiver.funds);
    let transactionAmount = parseFloat(amount);

    sender.funds = (senderAmount - transactionAmount).toFixed(2);

    receiver.funds = (receiverAmount + transactionAmount).toFixed(2);

    const transaction = transactionOrError.getValue();

    return Result.ok(await this.transactionsRepository.save(transaction));
  }

  async findBySenderDocument(sender_document: string) {
    const transaction =
      await this.transactionsRepository.findTransactionBySenderDocument(
        sender_document
      );

    if (!transaction) {
      return Result.fail<Transaction>([
        `Transaction was not found with [${sender_document}] as sender document!`,
      ]);
    }

    return Result.ok<Transaction>(transaction);
  }

  async calculateAmout(amount: string) {
    if (isNaN(Number(amount))) {
      return Result.fail([`Amount [${amount}] is not a number!`]);
    }

    return { amountToReceiver, subtractFromSender };
  }
}
