import { Box } from "@mui/material";
import React, { FC } from "react";
import { useCartContext } from "../../context";
import { CartItem } from "./CartItem";
interface Props {
  editable?: boolean;
}
export const CartList: FC<Props> = ({ editable }) => {
  const { cart } = useCartContext();

  return (
    <Box>
      {cart.map((product) => (
        <CartItem
          product={product}
          key={product.slug + product.size}
          editable={editable}
        />
      ))}
    </Box>
  );
};
