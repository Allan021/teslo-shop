export interface IUser {
  name: string;
  email: string;
  password?: string;
  role: Role;
  createdAt?: String;
  updatedAt?: String;
  _id?: string;
}

export type Role = "client" | "admin" | "seller";
