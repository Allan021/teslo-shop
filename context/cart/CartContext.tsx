import { createContext, useContext } from "react";
import { ICartProduct } from "../../interfaces";

interface CartContextProps {
  cart: ICartProduct[];
  numberOfItmes: number;
  subTotal: number;
  tax: number;
  total: number;
  addProduct: (product: ICartProduct) => void;

  updateCartQuantity: (product: ICartProduct) => void;
  deleteProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as CartContextProps);

export const useCartContext = () => {
  return useContext(CartContext);
};
