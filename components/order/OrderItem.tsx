import {
  Grid,
  CardMedia,
  Box,
  Typography,
  CardActionArea,
} from "@mui/material";
import React, { FC } from "react";
import { IOrderItem } from "../../interfaces";
import NavLink from "next/link";
import { currency } from "../../utils";
interface CartItemProps {
  orderItem: IOrderItem;
}
export const OrderItem: FC<CartItemProps> = ({ orderItem }) => {
  const { slug, size, _id, title, price, quantity, image } = orderItem;
  const url = `${image}`;

  return (
    <Grid container spacing={3} marginBottom={2}>
      <Grid item xs={3}>
        <NavLink href={`/product/${slug}`} passHref>
          <CardActionArea
            sx={{
              borderRadius: 5,
            }}
          >
            <CardMedia
              component="img"
              image={url}
              alt={title}
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
            {title}
          </Typography>
          <Typography variant="body1" component="h3">
            Talla : <strong> {size || "XS"} </strong>
          </Typography>

          <Typography variant="body1" component="h3">
            Cantidad :{" "}
            <strong>
              {" "}
              {quantity} {quantity > 1 ? "productos" : "producto"}{" "}
            </strong>
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={2}
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Typography variant="subtitle1">{currency.format(price)}</Typography>
      </Grid>
    </Grid>
  );
};
