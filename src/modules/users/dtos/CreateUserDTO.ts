export interface CreateUserDTO {
  name: string;
  lastname: string;
  document: string;
  email: string;
  password: string;
  role: "common" | "shopkeeper";
  funds?: string;
}
