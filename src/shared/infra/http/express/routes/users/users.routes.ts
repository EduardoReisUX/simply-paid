import { Request, Response, Router } from "express";
import { UsersService } from "../../../../../../modules/users/services/UsersService/UsersService";
import { UsersRepositoryInMemory } from "../../../../../../modules/users/repository/InMemory/UsersRepositoryInMemory";

export const usersRoute = Router();

const usersRepository = new UsersRepositoryInMemory([]);
export const usersService = new UsersService(usersRepository);

usersRoute.post("/", async (request: Request, response: Response) => {
  const { name, lastname, email, password, document, role } =
    await request.body;

  const successOrFailure = await usersService.create({
    name,
    lastname,
    email,
    document,
    password,
    role,
  });

  if (!successOrFailure || successOrFailure.isFailure) {
    return response.status(400).send({ errors: successOrFailure.errors });
  }

  return response.status(201).send();
});

usersRoute.get("/:document", async (request: Request, response: Response) => {
  const { document } = request.params;

  if (typeof document !== "string") {
    return response.status(400).send({
      errors: `InvalidFormatError: Document ${document} is not a string!`,
    });
  }

  const successOrFailure = await usersService.findByDocument(document);

  if (!successOrFailure || successOrFailure.isFailure) {
    return response.status(400).send({ errors: successOrFailure.errors });
  }

  return response.status(200).send({ user: successOrFailure.getValue() });
});
