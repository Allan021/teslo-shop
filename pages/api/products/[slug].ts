import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IProduct as IProduct } from "../../../interfaces";
import { Product } from "../../../models";
type Response =
  | {
    message: string;
  }
  | IProduct;
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { method } = req;
  switch (method) {
    case "GET":
      return getProductsBySlug(req, res);

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method method Not Allowed`);
  }
}
const getProductsBySlug = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ message: "Missing slug" });
  }

  await db.connect();
  const product = await Product.findOne({ slug }).select("-__v").lean();

  await db.disconnect();
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.images = product.images.map((image) => {
    return image.includes("http") ? image : `${process.env.HOST_NAME}/products/${image}`;
  });

  return res.status(200).json(product);
};
