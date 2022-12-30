import { useReducer, useEffect } from "react";
import { ICartProduct } from "../../interfaces";
import { CartContext, cartReducer } from ".";
import Cookies from "js-cookie";

export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItmes: number;
  subTotal: number;
  tax: number;
  total: number;
  shippingAddress?: ShippingAddress;
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

const Cart_INITIAL_STATE: CartState = {
  cart: [],
  isLoaded: false,
  numberOfItmes: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  shippingAddress: undefined,
};

export const CartProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(cartReducer, Cart_INITIAL_STATE);
  useEffect(() => {
    try {
      const cookieProducts = Cookies.get("cart")
        ? JSON.parse(Cookies.get("cart")!)
        : [];
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: cookieProducts,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: [],
      });
    }
  }, []);

  useEffect(() => {
    if (Cookies.get("name")) {
      const shippingAddress = {
        name: Cookies.get("name") || "",
        lastName: Cookies.get("lastName") || "",
        phone: Cookies.get("phone") || "",
        address1: Cookies.get("address1") || "",
        address2: Cookies.get("address2") || "",
        department: Cookies.get("department") || "",
        city: Cookies.get("city") || "",
        postalCode: Cookies.get("postalCode") || "",
        country: Cookies.get("country") || "",
      };

      dispatch({
        type: "[Cart] - LoadAddress from Cookies",
        payload: shippingAddress,
      });
    }
  }, []);

  useEffect(() => {
    if (state.cart.length === 0) {
      return;
    }

    Cookies.set("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    const numberOfItmes = state.cart.reduce(
      (acc, product) => product.quantity + acc,
      0
    );

    const subTotal = state.cart.reduce((acc, product) => {
      const price = product.price * product.quantity;
      return price + acc;
    }, 0);

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || "0");
    const total = subTotal * (taxRate + 1);

    const orderSummary = {
      numberOfItmes,
      subTotal,
      tax: subTotal * taxRate,
      total,
    };

    dispatch({
      type: "[Cart] - Update order summary",
      payload: orderSummary,
    });
  }, [state.cart]);

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    );
    if (!productInCart)
      return dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart, product],
      });

    // Acumular
    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;

      // Actualizar la cantidad
      p.quantity += product.quantity;
      return p;
    });

    dispatch({
      type: "[Cart] - Update products in cart",
      payload: updatedProducts,
    });
  };

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({
      type: "[Cart] - Update product quantity in cart",
      payload: product,
    });
  };
  const deleteProduct = (product: ICartProduct) => {
    dispatch({
      type: "[Cart] - Remove product from cart",
      payload: product,
    });
  };

  const updateAddress = (address: ShippingAddress) => {
    Object.keys(address).forEach((key) => {
      Cookies.set(key, address[key as keyof ShippingAddress] || "");
    });

    dispatch({
      type: "[Cart] - Update Address",
      payload: address,
    });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        updateAddress,
        addProduct: addProductToCart,
        updateCartQuantity,
        deleteProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
