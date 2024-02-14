import { expect, describe, it, beforeAll, afterAll } from "vitest";

const BASE_URL = "http://localhost:3000";

describe("User route", () => {
  let _server: import("node:http").Server;

  beforeAll(async () => {
    _server = (await import("./app")).app.listen(3000);
    await new Promise((resolve) => _server.once("listening", resolve));
  });

  afterAll(() => _server.close());

  describe("/post", () => {
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
      });

      const result = await request.json();
      const user = result.getValue();

      expect(request.status).toBe(201);

      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("name");
      expect(user).toHaveProperty("lastname");
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("password");
      expect(user).toHaveProperty("document");
      expect(user).toHaveProperty("role");
      expect(user).toHaveProperty("funds");
    });
  });
});
