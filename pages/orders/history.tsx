import Link from "next/link";
import { Chip, Grid, Stack, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid/DataGrid";

import { ShopLayout } from "../../components/layouts/ShopLayout";
import { GetServerSideProps } from "next";
import { dbOrders } from "../../database";
import { FC } from "react";
import { getSession } from "next-auth/react";
import { IOrder } from "../../interfaces/order";
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullname", headerName: "FullName", width: 200 },
  {
    field: "paid",
    headerName: "Paid",
    width: 150,
    description: "Esta columna muestra si el pedido ha sido pagado o no",
    renderCell(params) {
      return (
        <Chip
          label={params.value ? "Pagado" : "Pendiente"}
          color={params.value ? "success" : "error"}
          variant="outlined"
        />
      );
    },
  },
  {
    field: "view",
    headerName: "Ver Pedido",
    width: 150,
    sortable: false,
    editable: false,
    filterable: false,

    renderCell(params) {
      return (
        <Link href={`/orders/${params.row.view}`} passHref>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Ver detalle
          </Typography>
        </Link>
      );
    },
  },
];

interface OrdersPageProps {
  orders: IOrder[];
}

const OrdersPage: FC<OrdersPageProps> = ({ orders }) => {
  const rows = orders.map((order, idx) => ({
    id: idx + 1,
    fullname: `${order.shippingAddress.name} ${order.shippingAddress.lastName}`,
    paid: order.isPaid,
    view: order._id,
  }));

  return (
    <ShopLayout
      title="Historial de compras"
      description="Historial de compras de usuario"
    >
      <Grid
        className="fadeIn"
        container
        mt={2}
        sx={{
          width: {
            xs: "100%",
            sm: "560px",
            md: "840px",
            lg: "1200px",
          },
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Historial de compras
          </Typography>
        </Grid>

        <Grid item xs={12} height={600}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            sx={{
              boxShadow: 2,
            }}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  const orders = await dbOrders.getOrdersByUserId(session?.user?.id);

  return {
    props: {
      orders,
    },
  };
};

export default OrdersPage;
