import { db } from ".";
import { IProduct } from "../interfaces";
import { Product } from "../models";

export const getProductsBySlug = async (
  slug: string
): Promise<IProduct | null> => {
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  if (!product) {
    return null;
  }

  product.images = product.images.map((image) => {
    return image.includes("http") ? image : `${process.env.HOST_NAME}/products/${image}`;
  });

  return JSON.parse(JSON.stringify(product));
};

interface ProductsSlugs {
  slug: string;
}

export const getAllProductsSlugs = async (): Promise<ProductsSlugs[]> => {
  await db.connect();
  const slugs = await Product.find().select("slug -_id").lean();
  await db.disconnect();
  return slugs;
};

export const getProductsBySearch = async (
  search: string
): Promise<IProduct[]> => {
  let q = search.toString().trim().toLowerCase();

  await db.connect();
  const products = await Product.find({
    $text: { $search: q },
  })
    .select("title price slug images inStock -_id")
    .lean();

  await db.disconnect();

  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes("http") ? image : `${process.env.HOST_NAME}/products/${image}`;
    });
    return product;
  });

  return updatedProducts;
};

export const getRelatedProducts = async (): Promise<IProduct[]> => {
  await db.connect();
  //we get all products
  let products = await Product.find({})
    .select("title price slug images inStock -_id")
    .lean();

  await db.disconnect();

  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes("http") ? image : `${process.env.HOST_NAME}/products/${image}`;
    });
    return product;
  });

  return updatedProducts;
};
