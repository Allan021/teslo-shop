import { GetServerSideProps, NextPage } from "next";
import {
  Box,
  Card,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { CheckCircleOutline, GradeOutlined } from "@mui/icons-material";

import { AdminLayout } from '../../../components/layouts/AdminLayout';
import { OrderList, ShippingAdress } from '../../../components/order';
import { OrderSummary } from '../../../components/cart';
import { dbOrders } from '../../../database';
import { IOrder } from '../../../interfaces';


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
    <AdminLayout title={`Orden de Compra No: ${_id}`} subtitle="Resumen total"
        icon={<GradeOutlined />}
    >
  
      <Grid container padding={2} spacing={4}
        mt={2}
      >
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
            

          
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const { id = "" } = query as { id: string };

  const order = await dbOrders.getOrderByID(id.toString());


 
  if (!order) {
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
