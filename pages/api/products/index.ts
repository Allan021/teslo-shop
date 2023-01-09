import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IProduct as IProduct } from "../../../interfaces";
import { Product } from "../../../models";
import { SHOP_CONSTANTS } from "../../../database/constants";

type Response =
  | {
    message: string;
  }
  | IProduct[];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case "GET":
      // Get data from your database
      return getProducts(req, res);

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method method Not Allowed`);
  }
}
const getProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  const { gender = "all" } = req.query;
  let condition = {};

  if (gender !== "all" && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) {
    condition = {
      gender,
    };
  }

  await db.connect();

  const products = await Product.find(condition)
    .select("title price slug images inStock -_id")
    .lean();

  await db.disconnect();

  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes("http") ? image : `${process.env.HOST_NAME}/products/${image}`;
    });
    return product;
  });

  res.status(200).json(updatedProducts);
};
