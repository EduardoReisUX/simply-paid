import { Router } from "express";
import { usersRoute } from "./user.routes";

export const router = Router();

router.use("/users", usersRoute);
