import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { db } from "../../../database";
import { IUser } from "../../../interfaces";
import { IOrder } from "../../../interfaces/order";
import { Product } from "../../../models";
import Order from "../../../models/Order";

type Response =
  | {
    message: string;
  }
  | IOrder;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { method } = req;
  switch (method) {
    case "POST":
      return createOrder(req, res);

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method method Not Allowed`);
  }
}
const createOrder = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  const body = req.body;

  const { orderItems, total } = body as IOrder;
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const productsIds = orderItems.map((item) => item._id);
  await db.connect();

  const dbProducts = await Product.find({ _id: { $in: productsIds } });

  try {
    const subTotal = orderItems.reduce((acc, order) => {
      const currentPrice = dbProducts.find((p) => p.id === order._id)?.price;

      if (!currentPrice) {
        throw new Error("Product not found");
      }

      return currentPrice * order.quantity + acc;
    }, 0);

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || "0");
    const totalBackend = subTotal * (taxRate + 1);

    if (totalBackend !== total) {
      throw new Error("Invalid total");
    }

    const user = session.user;

    const order = new Order({
      ...body,
      user: user.id,
      isPaid: false,
    });

    order.total = Math.round(totalBackend * 100) / 100;

    await order.save();

    await db.disconnect();

    return res.status(201).json(order);
  } catch (error: any) {
    console.log(error);
    await db.disconnect();
    return res
      .status(500)
      .json({ message: error?.message || "Ocurrio un error en el servidor" });
  }
};
