export interface IProduct {
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ISize[];
  slug: string;
  tags: string[];
  title: string;
  type: IType;
  gender: IGender;
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ISize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type IType = "shirts" | "pants" | "hoodies" | "hats";
export type IGender = "men" | "women" | "kid" | "unisex";
