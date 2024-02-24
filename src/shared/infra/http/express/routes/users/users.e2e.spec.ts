import { expect, describe, it, beforeAll, afterAll } from "vitest";
import { startServer } from "../../app";
import type { Server } from "http";

const BASE_URL = "http://localhost:3333";

describe("/users", () => {
  let _server: Server;

  beforeAll(async () => {
    await new Promise((resolve) => {
      _server = startServer();
      _server.once("listening", resolve);
    });
  });

  afterAll(async () => {
    await new Promise((resolve) => {
      _server.close(() => console.log("Server is closed"));
      _server.once("close", resolve);
    });
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

  describe("GET", () => {
    it("should get user data given valid document", async () => {
      const request = await fetch(`${BASE_URL}/users/12345678911`);

      const response = await request.json();

      expect(request.status).toBe(200);
      expect(response.user).toHaveProperty("document", "12345678911");
      expect(response.user).toHaveProperty("email", "unique@email.com");
      expect(response.user).toHaveProperty("funds", "0.00");
      expect(response.user).toHaveProperty("lastname", "dos reis");
      expect(response.user).toHaveProperty("name", "dudu");
      expect(response.user).toHaveProperty("password", "dudu");
      expect(response.user).toHaveProperty("role", "common");
      expect(response.user).toHaveProperty("id");
    });

    it("should not get user data given invalid document", async () => {
      const request = await fetch(`${BASE_URL}/users/123`);

      const response = await request.json();

      expect(request.status).toBe(400);
      expect(response).toStrictEqual({
        errors: [
          "UsersService.findById: Could not find user by document [123]!",
        ],
      });
    });
  });
});
