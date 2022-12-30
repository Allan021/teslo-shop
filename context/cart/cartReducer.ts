import { ICartProduct } from "../../interfaces";
import { CartState, ShippingAddress } from ".";

type cartActionType =
  | {
      type: "[Cart] - LoadCart from cookies | storage";
      payload: ICartProduct[];
    }
  | {
      type: "[Cart] - Update products in cart";
      payload: ICartProduct[];
    }
  | {
      type: "[Cart] - Update product quantity in cart";
      payload: ICartProduct;
    }
  | {
      type: "[Cart] - Remove product from cart";
      payload: ICartProduct;
    }
  | { type: "[Cart] - LoadAddress from Cookies"; payload: ShippingAddress }
  | { type: "[Cart] - Update Address"; payload: ShippingAddress }
  | {
      type: "[Cart] - Update order summary";
      payload: {
        numberOfItmes: number;
        subTotal: number;
        tax: number;
        total: number;
      };
    };

export const cartReducer = (
  state: CartState,
  action: cartActionType
): CartState => {
  switch (action.type) {
    case "[Cart] - LoadCart from cookies | storage":
      return {
        ...state,
        isLoaded: true,
        cart: [...action.payload],
      };

    case "[Cart] - Update products in cart":
      return {
        ...state,
        cart: [...action.payload],
      };

    case "[Cart] - Update product quantity in cart":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;
          return action.payload;
        }),
      };

    case "[Cart] - Remove product from cart":
      return {
        ...state,
        cart: state.cart.filter(
          (product) =>
            !(
              product._id === action.payload._id &&
              product.size === action.payload.size
            )
        ),
      };

    case "[Cart] - Update order summary":
      return {
        ...state,
        numberOfItmes: action.payload.numberOfItmes,
        subTotal: action.payload.subTotal,
        tax: action.payload.tax,
        total: action.payload.total,
      };

    case "[Cart] - LoadAddress from Cookies":
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case "[Cart] - Update Address":
      return {
        ...state,
        shippingAddress: action.payload,
      };

    default:
      return state;
  }
};
