import { useEffect, useReducer } from "react";
import { IUser } from "../../interfaces";
import { authService } from "../../services";
import { AuthContext, authReducer } from "./";
import Cookies from "js-cookie";
import { RegisterPayload, RegisterResponse } from "./AuthContext";
import axios from "axios";
import { useRouter } from "next/router";
1;
export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const Auth_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);
  const router = useRouter();
  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await authService.login(email, password);
      Cookies.set("token", data.token);
      dispatch({ type: "[Auth] - Login", payload: data.user });
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    Cookies.remove("token");
    dispatch({ type: "[Auth] - Logout" });

    router.reload();
  };

  const checkUserLoggedIn = async () => {
    if (!Cookies.get("token")) {
      dispatch({ type: "[Auth] - Logout" });
      return;
    }

    try {
      const { data } = await authService.validateToken();
      Cookies.set("token", data.token);
      dispatch({ type: "[Auth] - Login", payload: data.user });
    } catch (error) {
      console.log(error);
      Cookies.remove("token");
      dispatch({ type: "[Auth] - Logout" });
    }
  };
  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const registerUser = async ({
    email,
    password,
    name,
  }: RegisterPayload): Promise<RegisterResponse> => {
    try {
      const { data } = await authService.register({
        email,
        password,
        name,
      });
      Cookies.set("token", data.token);
      dispatch({ type: "[Auth] - Login", payload: data.user });

      return { hasError: false };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message || "Something went wrong",
        };
      }
      return { hasError: true, message: "Error en la autenticacion" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginUser,
        logout,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
