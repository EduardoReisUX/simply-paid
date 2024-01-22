export interface IUser {
  name: string;
  lastname: string;
  document: string;
  email: string;
  password: string;
  role: "common" | "shopkeeper";
  funds?: number;
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
    this.funds = user.funds || 0;
  }

  public static create(user: IUser) {
    const document = this.validateDocument(user.document);

    if (!document.isValid) {
      return document.errors;
    }

    const role = this.validateRole(user.role);

    if (!role.isValid) {
      return role.errors;
    }

    return new User(user);
  }

  private static validateDocument(document: string) {
    const errors = [];

    if (isNaN(Number(document))) {
      errors.push({
        name: "InvalidFormatError",
        message: `The user document [${document}] must have only numbers!`,
      });
    }

    if (document.length !== 11) {
      errors.push({
        name: "InvalidLengthError",
        message: `The user document [${document}] must have 11 digits!`,
      });
    }

    return { errors, isValid: !errors.length };
  }

  private static validateRole(role: string) {
    const errors = [];

    if (role !== "common" && role !== "shopkeeper") {
      errors.push({
        name: "InvalidFormatError",
        message: `The user role [${role}] should have only numbers!`,
      });
    }

    return { errors, isValid: !errors.length };
  }
}
