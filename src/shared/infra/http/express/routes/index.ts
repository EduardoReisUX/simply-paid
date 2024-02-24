import { Router } from "express";
import { usersRoute } from "./users/users.routes";
import { transactionsRoute } from "./transactions/transactions.routes";

export const router = Router();

router.use("/users", usersRoute);
router.use("/transactions", transactionsRoute);
