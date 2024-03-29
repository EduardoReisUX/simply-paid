import express, { Request, Response } from "express";
import { router } from "./routes";

export const app = express();

app.use(express.json());

app.use(router);

app.use((error: Error, request: Request, response: Response) => {
  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${error.message}`,
  });
});

export const startServer = () => {
  return app.listen(3333, () => console.log("Server is running"));
};
