import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../database";
import { Product } from "../../models";
import { initialData } from "../../database/seed-data";
import { User } from "../../models/";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await db.connect();
  await Product.deleteMany({});
  await Product.insertMany(initialData.products);
  await User.deleteMany({});
  await User.insertMany(initialData.users);
  await db.disconnect();
  res.status(200).json({ message: "Seed executed successfully" });
}
