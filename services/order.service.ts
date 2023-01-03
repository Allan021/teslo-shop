import tesloApi from "../api/teslo";
import { IOrder } from "../interfaces/order";
export const createOrder = async (body: IOrder) => {
  try {
    const { data } = await tesloApi.post("/orders", body);
    return data;
  } catch (error) {
    throw error;
  }
};
