import { Stack, Typography } from "@mui/material";

interface OrderSumaryItemProps {
  label: string;
  value: string;
  mb?: number;
}
export const OrderSummaryItem = ({
  label,
  value,
  mb,
}: OrderSumaryItemProps) => {
  return (
    <Stack
      spacing={2}
      alignItems={"center"}
      justifyContent={"space-between"}
      direction={"row"}
      mb={mb}
    >
      <Typography lineHeight={2} color={"text.secondary"}>
        {label}
      </Typography>
      <Typography lineHeight={2} fontWeight={700}>
        {value}
      </Typography>
    </Stack>
  );
};
