import { isValidObjectId } from "mongoose";
import { db } from ".";
import { IOrder } from "../interfaces";
import Order from "../models/Order";

export const getOrderByID = async (id: string): Promise<IOrder | null> => {
  if (!isValidObjectId(id)) {
    return null;
  }
  await db.connect();

  const order = await Order.findById(id).lean();
  await db.disconnect();

  if (!order) {
    return null;
  }

  return JSON.parse(JSON.stringify(order));
};

export const getOrdersByUserId = async (
  userId: string = ""
): Promise<IOrder[]> => {
  if (!isValidObjectId(userId)) {
    return [];
  }
  await db.connect();

  //get all orders by user id and return them with all the data of user and product
  const orders = await Order.find({
    user: userId,
  });

  await db.disconnect();

  return JSON.parse(JSON.stringify(orders));
};
