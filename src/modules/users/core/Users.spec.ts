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

    expect(result).toBeTruthy();
  });

  it("should not create a user given invalid document format", () => {
    const data = {
      name: "dudu",
      lastname: "dos reis",
      email: "unique@email.com",
      password: "dudu",
      document: "asdfghjklzx",
      role: "common",
    } as IUser;

    expect(User.create(data)).toStrictEqual([
      {
        message: "The document asdfghjklzx must have only numbers!",
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
        message: "The document 123456 must have 11 digits!",
        name: "InvalidLengthError",
      },
    ]);
  });
});
