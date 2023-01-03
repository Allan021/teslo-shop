import { tesloApi } from "../api/";

export const login = async (email: string, password: string) => {
  try {
    const response = await tesloApi.post("/user/login", {
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
    const response = await tesloApi.post("/user/register", {
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
    const response = await tesloApi.post("/user/verify-token");
    return response;
  } catch (error) {
    throw error;
  }
};
