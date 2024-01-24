import { describe, expect, it } from "vitest";
import { IUser, User } from "./Users";

describe("Users", () => {
  it("should create a user given valid data", () => {
    const data = {
      name: "dudu",
      lastname: "dos reis",
      email: "unique@email.com",
      password: "dudu",
      document: "12345678911",
      role: "common",
    } as IUser;

    const result = User.create(data);
    const user = result.getValue();

    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("lastname");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("password");
    expect(user).toHaveProperty("document");
    expect(user).toHaveProperty("role");
    expect(user).toHaveProperty("funds");
  });

  it("should not create a user given invalid document format", () => {
    const data = {
      name: "dudu",
      lastname: "dos reis",
      email: "unique@email.com",
      password: "dudu",
      document: "asdfghjklzx",
      role: "shopkeeper",
    } as IUser;

    const result = User.create(data);

    expect(result.errors).toStrictEqual([
      "InvalidFormatError: The user document [asdfghjklzx] must have only numbers!",
    ]);
  });

  it("should not create a user given invalid document length", () => {
    const data = {
      name: "dudu",
      lastname: "dos reis",
      email: "unique@email.com",
      password: "dudu",
      document: "123456",
      role: "common",
    } as IUser;

    const result = User.create(data);

    expect(result.errors).toStrictEqual([
      "InvalidLengthError: The user document [123456] must have 11 digits!",
    ]);
  });

  it("should not create a user given invalid document length AND format", () => {
    const data = {
      name: "dudu",
      lastname: "dos reis",
      email: "unique@email.com",
      password: "dudu",
      document: "789sfg _",
      role: "shopkeeper",
    } as IUser;

    const result = User.create(data);

    const errors = [
      "InvalidFormatError: The user document [789sfg _] must have only numbers!",
      "InvalidLengthError: The user document [789sfg _] must have 11 digits!",
    ];

    expect(result.errors).toStrictEqual(errors);
  });
});
