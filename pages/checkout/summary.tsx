import React from "react";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import { Button, Card, Divider, Grid, Stack, Typography } from "@mui/material";
import { CartList, OrderSummary } from "../../components/cart";
import Link from "next/link";
import { useCartContext } from "../../context/cart/CartContext";

const SummaryPage = () => {
  const { shippingAddress, numberOfItmes } = useCartContext();

  if (!shippingAddress) {
    return <></>;
  }

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
    <ShopLayout
      title="Resumen de compra"
      description="Página de resumen de compra"
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Resumen del pedido
      </Typography>
      <Grid container padding={2} spacing={4}>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card sx={{ padding: 4 }}>
            <Typography variant="subtitle1" component="h3">
              Resumen de compra ({numberOfItmes}{" "}
              {numberOfItmes === 1 ? "producto" : "productos"})
            </Typography>

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
                Dirección de envío
              </Typography>
              <Link href="/checkout/address">
                <Typography
                  color="primary"
                  variant="body1"
                  lineHeight={2}
                  sx={{
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Editar
                </Typography>
              </Link>
            </Stack>
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

            <Divider
              sx={{
                my: 2,
              }}
            />

            <Stack justifyContent={"flex-end"} direction={"row"}>
              <Link href="/cart">
                <Typography
                  color="primary"
                  variant="body1"
                  sx={{
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Editar
                </Typography>
              </Link>
            </Stack>
            <OrderSummary />
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
              <Typography
                lineHeight={2}
                color={"secondary.main"}
                variant="subtitle1"
              >
                $110
              </Typography>
            </Stack>
          </Card>
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
            }}
          >
            Comprar
          </Button>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
