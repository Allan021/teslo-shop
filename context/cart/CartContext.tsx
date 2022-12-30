import { createContext, useContext } from "react";
import { ICartProduct } from "../../interfaces";
import { ShippingAddress } from "./CartProvider";

interface CartContextProps {
  cart: ICartProduct[];
  isLoaded: boolean;
  numberOfItmes: number;
  subTotal: number;
  tax: number;
  total: number;
  addProduct: (product: ICartProduct) => void;
  shippingAddress?: ShippingAddress;
  updateCartQuantity: (product: ICartProduct) => void;
  deleteProduct: (product: ICartProduct) => void;
  updateAddress: (address: ShippingAddress) => void;
}

export const CartContext = createContext({} as CartContextProps);

export const useCartContext = () => {
  return useContext(CartContext);
};
