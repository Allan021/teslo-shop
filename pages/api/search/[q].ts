import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IProduct as IProduct } from "../../../interfaces";
import { Product } from "../../../models";

type Response =
  | {
      message: string;
    }
  | IProduct[];
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { method } = req;
  switch (method) {
    case "GET":
      return searchProducts(req, res);

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method method Not Allowed`);
  }
}
async function searchProducts(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  await db.connect();

  let { q } = req.query;

  if (!q) {
    return res.status(400).json({ message: "Missing query" });
  }

  q = q.toString().trim().toLowerCase();

  const products = await Product.find({
    $text: { $search: q },
  })
    .select("title price slug images inStock -_id")
    .lean();

  await db.disconnect();

  return res.status(200).json(products);
}
