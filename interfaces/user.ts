export interface IUser {
  name: string;
  email: string;
  password?: string;
  role: Role;
  createdAt?: String;
  updatedAt?: String;
}

export type Role = "client" | "admin" | "seller";
