import React, { useState } from "react";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import {
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  Typography,
  Chip,
} from "@mui/material";
import { CartList, OrderSummary } from "../../components/cart";
import Link from "next/link";
import { useCartContext } from "../../context/cart/CartContext";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { ShippingAdress } from "../../components/order/ShippingAdress";

const SummaryPage = () => {
  const { shippingAddress, numberOfItmes, createOrder } = useCartContext();
  const router = useRouter();
  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (!Cookies.get("name")) {
      router.push("/checkout/address");
    }
  }, [router]);

  if (!shippingAddress) {
    return <></>;
  }

  const handleCreateOrder = async () => {
    setIsPosting(true);
    const { hasError, message, _id } = await createOrder();
    if (hasError) {
      setIsPosting(false);
      setErrorMessage(message);

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    setIsPosting(false);
    setErrorMessage("");
    if (_id) {
      router.push(`/orders/${_id}`);
    }
  };

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
            <ShippingAdress shippingAddress={shippingAddress} />
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
            {errorMessage && (
              <Chip
                label={errorMessage}
                color="error"
                className="fadeIn"
                sx={{
                  mt: 2,
                  width: "100%",
                }}
              />
            )}
          </Card>
          <Button
            variant="contained"
            onClick={handleCreateOrder}
            fullWidth
            sx={{
              mt: 2,
            }}
            disabled={isPosting}
          >
            Comprar
          </Button>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
