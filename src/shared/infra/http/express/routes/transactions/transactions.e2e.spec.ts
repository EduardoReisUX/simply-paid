import { expect, describe, it, beforeAll, afterAll } from "vitest";
import { startServer } from "../../app";
import type { Server } from "http";

const BASE_URL = "http://localhost:3333";

describe("/transactions", () => {
  let _server: Server;

  const common_user = {
    name: "dudu",
    lastname: "dos reis",
    email: "unique@email.com",
    password: "dudu",
    document: "12345678911",
    role: "common",
  };

  const common_user_with_credits = {
    name: "eduardo",
    lastname: "dos reis",
    email: "uniquely@email.com",
    password: "dudu",
    document: "12345678912",
    role: "common",
    funds: 1000,
  };

  const shopkeeper_user = {
    name: "empresa",
    lastname: "dos reis",
    email: "unique@dosreis.com",
    password: "dos reis",
    document: "98765432100",
    role: "shopkeeper",
  };

  beforeAll(async () => {
    await new Promise((resolve) => {
      _server = startServer();
      _server.once("listening", resolve);
    });

    await fetch(`${BASE_URL}/users`, {
      method: "POST",
      body: JSON.stringify(common_user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await fetch(`${BASE_URL}/users`, {
      method: "POST",
      body: JSON.stringify(shopkeeper_user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await fetch(`${BASE_URL}/users`, {
      method: "POST",
      body: JSON.stringify(common_user_with_credits),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  afterAll(async () => {
    await new Promise((resolve) => {
      _server.close(() => console.log("Server is closed"));
      _server.once("close", resolve);
    });
  });

  describe("POST", () => {
    it("should create a transaction given valid data", async () => {
      const data = {
        sender_document: common_user_with_credits.document,
        receiver_document: shopkeeper_user.document,
        amount: "19.90",
      };

      const request = await fetch(`${BASE_URL}/transactions`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      expect(request.status).toBe(201);
    });

    it("should not create a transaction given sender does not have sufficient funds", async () => {
      const data = {
        sender_document: common_user.document,
        receiver_document: shopkeeper_user.document,
        amount: "19.90",
      };

      const request = await fetch(`${BASE_URL}/transactions`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await request.json();

      expect(request.status).toBe(400);
      expect(response).toStrictEqual({
        errors: ["Sender [dudu] does not have sufficient funds!"],
      });
    });

    it("should not create a transaction given any invalid data", async () => {
      const data = {
        sender_document: "123",
        receiver_document: "1238",
        amount: "19.90",
      };

      const request = await fetch(`${BASE_URL}/transactions`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await request.json();

      expect(request.status).toBe(400);
      expect(response).toStrictEqual({
        errors: ["Sender not found!"],
      });
    });
  });
});
