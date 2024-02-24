import { Result } from "../../../shared/Result";

export interface IUser {
  name: string;
  lastname: string;
  document: string;
  email: string;
  password: string;
  role: "common" | "shopkeeper";
  funds?: string;
}

export class User {
  id;
  name;
  lastname;
  document;
  email;
  password;
  role;
  funds;

  constructor(user: IUser) {
    this.id = crypto.randomUUID();
    this.name = user.name;
    this.lastname = user.lastname;
    this.document = user.document;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
    this.funds = user.funds || "0.00";
  }

  public static create(user: IUser) {
    const document = this.validateDocument(user.document);

    if (!document.isValid) {
      return Result.fail<User>(document.errors);
    }

    const role = this.validateRole(user.role);

    if (!role.isValid) {
      return Result.fail<User>(role.errors);
    }

    return Result.ok<User>(new User(user));
  }

  private static validateDocument(document: string) {
    const errors = [];

    if (isNaN(Number(document))) {
      errors.push(
        `InvalidFormatError: The user document [${document}] must have only numbers!`
      );
    }

    if (document.length !== 11) {
      errors.push(
        `InvalidLengthError: The user document [${document}] must have 11 digits!`
      );
    }

    return { errors, isValid: !errors.length };
  }

  private static validateRole(role: string) {
    const errors = [];

    if (role !== "common" && role !== "shopkeeper") {
      errors.push(
        `InvalidFormatError: The user role [${role}] should be 'common' or 'shopkeeper' only!`
      );
    }

    return { errors, isValid: !errors.length };
  }
}
