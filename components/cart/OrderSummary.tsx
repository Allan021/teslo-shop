import { Box, Divider, Stack, Typography } from "@mui/material";
import { useCartContext } from "../../context";
import { currency } from "../../utils";
import { OrderSummaryItem } from "./OrderSummaryItem";
const isv = Number(process.env.NEXT_PUBLIC_TAX_RATE || "0") * 100;

export const OrderSummary = () => {
  const { subTotal, tax, total, numberOfItmes } = useCartContext();

  return (
    <Box>
      <Box mt={2}>
        <OrderSummaryItem
          label={numberOfItmes > 1 ? `Artículos` : `Artículo`}
          value={`${numberOfItmes}`}
        />

        <OrderSummaryItem label="Subtotal" value={currency.format(subTotal)} />
        <OrderSummaryItem
          label={`Impuesto (${isv}%)`}
          value={currency.format(tax)}
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
          {currency.format(total)}
        </Typography>
      </Stack>
    </Box>
  );
};
