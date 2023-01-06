import { IUser } from "./user";
import { ISize } from "./product";

export interface IOrder {
  _id?: string;
  user?: IUser | string;
  orderItems: IOrderItem[];
  shippingAddress: ShippingAddress;
  paymentResult?: string;
  number0fItems: number;
  subTotal: number;
  tax: number;
  total: number;
  isPaid: boolean;
  paidAt?: string;
  paymentId?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface IOrderItem {
  _id: string;
  title: string;
  size: ISize;
  quantity: number;
  slug: string;
  image: string;
  price: number;
}

export interface ShippingAddress {
  name: string;
  lastName: string;
  phone: string;
  address1: string;
  address2?: string;
  department: string;
  city: string;
  postalCode: string;
  country: string;
}


export interface OrderPayload {
  transactionID: string,
  orderID: string
}

export interface OrderResponse {
  data: {
    message: string
  }
}