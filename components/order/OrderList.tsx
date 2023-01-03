import { Box } from "@mui/material";
import React, { FC } from "react";
import { IOrderItem } from "../../interfaces/";
import { OrderItem } from "./OrderItem";
interface Props {
  orderItems: IOrderItem[];
}
export const OrderList: FC<Props> = ({ orderItems }) => {
  return (
    <Box>
      {orderItems.map((order) => (
        <OrderItem orderItem={order} key={order.slug + order.size} />
      ))}
    </Box>
  );
};
