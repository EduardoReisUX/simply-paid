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

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("name");
    expect(result).toHaveProperty("lastname");
    expect(result).toHaveProperty("email");
    expect(result).toHaveProperty("password");
    expect(result).toHaveProperty("document");
    expect(result).toHaveProperty("role");
    expect(result).toHaveProperty("funds");
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

    expect(User.create(data)).toStrictEqual([
      {
        message: "The user document [asdfghjklzx] must have only numbers!",
        name: "InvalidFormatError",
      },
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

    expect(User.create(data)).toStrictEqual([
      {
        message: "The user document [123456] must have 11 digits!",
        name: "InvalidLengthError",
      },
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

    const errors = [
      { name: "InvalidFormatError" },
      { name: "InvalidLengthError" },
    ];

    expect(User.create(data)).toMatchObject(errors);
  });
});
