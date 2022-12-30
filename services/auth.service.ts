import { tesloApi } from "../api/";

export const login = async (email: string, password: string) => {
  try {
    const response = await tesloApi.post("/auth/login", {
      email,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

interface IRegister {
  email: string;
  password: string;
  name: string;
}
export const register = async ({ email, password, name }: IRegister) => {
  try {
    const response = await tesloApi.post("/auth/register", {
      email,
      password,
      name,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const validateToken = async () => {
  try {
    const response = await tesloApi.post("/auth/verify-token");
    return response;
  } catch (error) {
    throw error;
  }
};
