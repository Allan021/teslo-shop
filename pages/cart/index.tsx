import { useRouter } from "next/router";
import { useEffect } from "react";
import { ShopLayout } from "../../components/layouts";
import { Button, Card, Grid, Typography } from "@mui/material";

import { CartList, OrderSummary } from "../../components/cart";
import { useCartContext } from "../../context/cart/";

const Cart = () => {
  const { cart, isLoaded } = useCartContext();
  const router = useRouter();
  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace("/cart/empty");
    }
  }, [cart, isLoaded, router]);

  if (!isLoaded || cart.length === 0) {
    return <></>;
  }

  return (
    <ShopLayout title="Cart" description="Cart page">
      <Typography variant="h4" component="h1" gutterBottom>
        Carrito de compras
      </Typography>
      <Grid container padding={2} spacing={4}>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card sx={{ padding: 4 }}>
            <Typography variant="subtitle1" component="h3">
              Resumen de compra
            </Typography>
            <OrderSummary />
          </Card>
          <Button
            variant="contained"
            fullWidth
            href="/checkout/address"
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

export default Cart;
