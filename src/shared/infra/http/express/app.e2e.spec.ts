import { expect, describe, it, beforeAll, afterAll } from "vitest";
import { startServer } from "./app";

const BASE_URL = "http://localhost:3333";

describe("/users", () => {
  let _server;

  beforeAll(async () => {
    _server = startServer();
  });

  afterAll(async () => {
    await _server.close(() => console.log("Server is closed"));
  });

  describe("POST", () => {
    it("should create a user given valid data", async () => {
      const data = {
        name: "dudu",
        lastname: "dos reis",
        email: "unique@email.com",
        password: "dudu",
        document: "12345678911",
        role: "common",
      };

      const request = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      expect(request.status).toBe(201);
    });

    it("should not create a user given any invalid data", async () => {
      const data = {
        name: "dudu",
        lastname: "dos reis",
        email: "unique2@email.com",
        password: "dudu",
        document: "12345a",
        role: "asdf",
      };

      const request = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await request.json();

      expect(request.status).toBe(400);
      expect(response).toStrictEqual({
        errors: [
          "InvalidFormatError: The user document [12345a] must have only numbers!",
          "InvalidLengthError: The user document [12345a] must have 11 digits!",
          // "InvalidFormatError: The user role [asdf] should be 'common' or 'shopkeeper' only!",
        ],
      });
    });

    it("should not create a user given user already exists", async () => {
      const data = {
        name: "dudu",
        lastname: "dos reis",
        email: "unique@email.com",
        password: "dudu",
        document: "12345678911",
        role: "common",
      };

      const request = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await request.json();

      expect(request.status).toBe(400);
      expect(response).toStrictEqual({
        errors: ["user document [12345678911] already exists!"],
      });
    });
  });
});
