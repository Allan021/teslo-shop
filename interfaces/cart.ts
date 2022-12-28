import { IGender, ISize } from "./product";

export interface ICartProduct {
  _id: string;
  image: string;
  price: number;
  size?: ISize;
  slug: string;
  title: string;
  gender: IGender;
  inStock?: number;
  quantity: number;
}
