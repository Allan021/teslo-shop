import { useReducer, useEffect, useState } from "react";
import { ICartProduct, ShippingAddress } from "../../interfaces";
import { CartContext, cartReducer, CartResponse } from ".";
import Cookies from "js-cookie";
import { orderService } from "../../services";
import { IOrder } from "../../interfaces/order";
import { isAxiosError } from "axios";

export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItmes: number;
  subTotal: number;
  tax: number;
  total: number;
  shippingAddress?: ShippingAddress;
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

  const [cartItemsAreLoader, setCartItemsAreLoader] = useState(false);

  useEffect(() => {
    try {
      const cookieProducts = Cookies.get("cart")
        ? JSON.parse(Cookies.get("cart")!)
        : [];
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: cookieProducts,
      });

      setCartItemsAreLoader(true);
    } catch (error) {
      console.log(error);
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: [],
      });
      setCartItemsAreLoader(true);
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
    if (!cartItemsAreLoader) return;

    Cookies.set("cart", JSON.stringify(state.cart));
  }, [cartItemsAreLoader, state.cart]);

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

  const createOrder = async (): Promise<CartResponse> => {
    if (!state.shippingAddress) {
      throw new Error("No hay una dirección de envío");
    }

    const body: IOrder = {
      shippingAddress: state.shippingAddress,
      number0fItems: state.numberOfItmes,
      subTotal: state.subTotal,
      tax: state.tax,
      total: state.total,
      isPaid: false,
      orderItems: state.cart.map((product) => ({
        ...product,
        size: product.size!,
      })),
    };

    try {
      const order = await orderService.createOrder(body);

      dispatch({
        type: "[Cart] - Clear Cart",
      });

      return {
        hasError: false,
        _id: order._id,
        message: "Orden creada correctamente",
      };
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message || "Error al crear la orden",
        };
      }
      return {
        hasError: true,
        message: "Error al crear la orden, intente más tarde",
      };
    }
  };

  const clearCart = () => {
    dispatch({
      type: "[Cart] - Clear Cart",
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
        createOrder,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
