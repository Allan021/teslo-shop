import { Box, Divider, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useCartContext } from "../../context";
import { currency } from "../../utils";
import { OrderSummaryItem } from "./OrderSummaryItem";
const isv = Number(process.env.NEXT_PUBLIC_TAX_RATE || "0") * 100;

interface Props {
  orderSummary?: {
    subTotal: number;
    tax: number;
    total: number;
    numberOfItmes: number;
  };
}

export const OrderSummary: FC<Props> = ({ orderSummary }) => {
  const { subTotal, tax, total, numberOfItmes } = useCartContext();
  const summary = orderSummary || { subTotal, tax, total, numberOfItmes };
  return (
    <Box>
      <Box mt={2}>
        <OrderSummaryItem
          label={summary.numberOfItmes > 1 ? `Artículos` : `Artículo`}
          value={`${summary.numberOfItmes}`}
        />

        <OrderSummaryItem
          label="Subtotal"
          value={currency.format(summary.subTotal)}
        />
        <OrderSummaryItem
          label={`Impuesto (${isv}%)`}
          value={currency.format(summary.tax)}
        />
      </Box>
      <Divider
        sx={{
          my: 2,
        }}
      />
      <Stack
        spacing={2}
        alignItems={"center"}
        justifyContent={"space-between"}
        direction={"row"}
      >
        <Typography variant="subtitle1" lineHeight={2}>
          Total
        </Typography>
        <Typography lineHeight={2} color={"secondary.main"} variant="subtitle1">
          {currency.format(summary.total)}
        </Typography>
      </Stack>
    </Box>
  );
};
