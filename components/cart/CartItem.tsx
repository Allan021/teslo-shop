import {
  Grid,
  CardMedia,
  Box,
  Typography,
  Button,
  CardActionArea,
} from "@mui/material";
import React, { FC } from "react";
import { ICartProduct } from "../../interfaces";
import { ItemCounter } from "../ui";
import NavLink from "next/link";
import { useCartContext } from "../../context/cart/";
interface CartItemProps {
  product: ICartProduct;
  editable?: boolean;
}
export const CartItem: FC<CartItemProps> = ({ product, editable }) => {
 
  const { updateCartQuantity, deleteProduct } = useCartContext();
  const updateProductQuantity = (value: number) => {
    const newProduct = { ...product, quantity: value };

    newProduct.quantity = value;
    updateCartQuantity(newProduct);
  };

  const removeProduct = () => {
    deleteProduct(product);
  };

  return (
    <Grid container spacing={3} marginBottom={2}>
      <Grid item xs={3}>
        <NavLink href={`${product.slug}`} passHref>
          <CardActionArea
            sx={{
              borderRadius: 5,
            }}
          >
            <CardMedia
              component="img"
              image={product.image}
              alt={product.title}
              sx={{
                borderRadius: 5,
              }}
            />
          </CardActionArea>
        </NavLink>
      </Grid>

      <Grid item xs={7}>
        <Box display={"flex"} flexDirection={"column"}>
          <Typography variant="body1" component="h3">
            {product.title}
          </Typography>
          <Typography variant="body1" component="h3">
            Talla : <strong> {product.size || "XS"} </strong>
          </Typography>
          {!editable ? (
            <Typography variant="body1" component="h3">
              Cantidad :{" "}
              <strong>
                {" "}
                {product.quantity}{" "}
                {product.quantity > 1 ? "productos" : "producto"}{" "}
              </strong>
            </Typography>
          ) : (
            <ItemCounter
              value={product.quantity}
              max={product.inStock}
              onChange={(value) => updateProductQuantity(value)}
              min={1}
            />
          )}
        </Box>
      </Grid>
      <Grid
        item
        xs={2}
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Typography variant="subtitle1">${product.price}</Typography>

        {editable && (
          <Button onClick={removeProduct} variant="text">
            Remover
          </Button>
        )}
      </Grid>
    </Grid>
  );
};
