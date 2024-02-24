import { Request, Response, Router } from "express";
import { TransactionsRepositoryInMemory } from "../../../../../../modules/transactions/repository/InMemory/TransactionsRepositoryInMemory";
import { TransactionsService } from "../../../../../../modules/transactions/services/TransactionsService";
import { usersService } from "../users/users.routes";

export const transactionsRoute = Router();

const transactionsRepository = new TransactionsRepositoryInMemory([]);
const transactionsService = new TransactionsService(
  transactionsRepository,
  usersService
);

transactionsRoute.post("/", async (request: Request, response: Response) => {
  const { amount, receiver_document, sender_document } = await request.body;

  const successOrFailure = await transactionsService.createTransaction({
    amount,
    receiver_document,
    sender_document,
  });

  if (!successOrFailure || successOrFailure.isFailure) {
    return response.status(400).send({ errors: successOrFailure.errors });
  }

  return response.status(201).send();
});

transactionsRoute.get(
  "/:document",
  async (request: Request, response: Response) => {
    const { document } = request.params;

    if (typeof document !== "string") {
      return response.status(400).send({
        errors: `InvalidFormatError: Document ${document} is not a string!`,
      });
    }

    const successOrFailure = await transactionsService.findBySenderDocument(
      document
    );

    if (!successOrFailure || successOrFailure.isFailure) {
      return response.status(400).send({ errors: successOrFailure.errors });
    }

    return response.status(200).send({ user: successOrFailure.getValue() });
  }
);
