import { createContext, useContext } from "react";
import { IUser } from "../../interfaces";

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

export interface RegisterResponse {
  hasError: boolean;
  message?: string;
}

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;

  //methods
  loginUser: (email: string, password: string) => Promise<boolean>;
  registerUser: (payload: RegisterPayload) => Promise<RegisterResponse>;
  logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);

export const useAuthContext = () => useContext(AuthContext);
