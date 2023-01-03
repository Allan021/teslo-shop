import { GetServerSideProps, NextPage } from "next";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import {
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { OrderSummary } from "../../components/cart";
import { dbOrders } from "../../database";
import { getSession } from "next-auth/react";
import { IOrder } from "../../interfaces/order";
import { OrderList } from "../../components/order";
import { ShippingAdress } from "../../components/order/ShippingAdress";

interface OrdersPageProps {
  order: IOrder;
}
const OrdersPage: NextPage<OrdersPageProps> = ({ order }) => {
  const {
    orderItems,
    shippingAddress,
    _id,
    subTotal,
    isPaid,
    number0fItems,
    tax,
    total,
  } = order;
  return (
    <ShopLayout title="Orden de compra 12132" description="Resumen de compra">
      <Typography variant="h4" component="h1" gutterBottom>
        Resumen de compra {_id}
      </Typography>
      <Grid container padding={2} spacing={4}>
        <Grid item xs={12} sm={7}>
          <Chip
            label={isPaid ? "Pagado" : "No Pagado"}
            color={isPaid ? "success" : "error"}
            variant="outlined"
            icon={<CheckCircleOutline />}
            sx={{
              mb: 2,
            }}
          />
          <OrderList orderItems={orderItems} />
        </Grid>
        <Grid item xs={12} sm={5} className="fadeIn">
          <Card sx={{ padding: 4 }}>
            <Typography variant="subtitle1" component="h3">
              Resumen de compra ({number0fItems} productos)
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
            </Stack>
            <ShippingAdress shippingAddress={shippingAddress} />

            <Divider
              sx={{
                my: 2,
              }}
            />

            <OrderSummary
              orderSummary={{
                subTotal,
                numberOfItmes: number0fItems,
                tax,
                total,
              }}
            />

            {isPaid ? (
              <Chip
                label={isPaid ? "Pagado" : "No Pagado"}
                color={isPaid ? "success" : "error"}
                variant="outlined"
                icon={<CheckCircleOutline />}
                sx={{
                  mb: 2,
                  mt: 2,
                }}
              />
            ) : (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  mt: 2,
                }}
              >
                Pagar
              </Button>
            )}
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const { id = "" } = query as { id: string };

  const order = await dbOrders.getOrderByID(id.toString());

  const session = await getSession({ req });

  if (!order) {
    return {
      redirect: {
        destination: "/orders/history",
        permanent: false,
      },
    };
  }

  if (order.user !== session?.user.id) {
    return {
      redirect: {
        destination: "/orders/history",
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrdersPage;
