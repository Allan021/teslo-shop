import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { ShippingAddress } from "../../interfaces/order";
interface Props {
  shippingAddress: ShippingAddress;
}
export const ShippingAdress: FC<Props> = ({ shippingAddress }) => {
  const {
    name,
    lastName,
    address1,
    address2,
    city,
    postalCode,
    country,
    department,
    phone,
  } = shippingAddress;
  return (
    <Box>
      <Typography color={"text.secondary"} variant="body1">
        {name + " " + lastName}
      </Typography>
      <Typography color={"text.secondary"} variant="body1">
        {address1}
      </Typography>

      {address2 && (
        <Typography color={"text.secondary"} variant="body1">
          {address2}
        </Typography>
      )}

      <Typography color={"text.secondary"} variant="body1">
        {city + ", " + department + ", " + postalCode}
      </Typography>

      <Typography color={"text.secondary"} variant="body1">
        {country}
      </Typography>

      <Typography color={"text.secondary"} variant="body1">
        {phone}
      </Typography>
    </Box>
  );
};
