import Link from 'next/link';
import { Chip, Grid, Stack, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid/DataGrid';

import { ShopLayout } from '../../components/layouts/ShopLayout';
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'FullName', width: 200 },
    {
        field: 'paid', headerName: 'Paid', width: 150,
        description: "Esta columna muestra si el pedido ha sido pagado o no",
        renderCell(params) {
            return (
                <Chip
                    label={params.value ? "Pagado" : "Pendiente"}
                    color={params.value ? "success" : "error"}
                    variant="outlined"
                />
            )
        },
    },
    {
        field: "view", headerName: "Ver Pedido", width: 150,
        sortable: false,
        editable: false,
        filterable: false,

        renderCell(params) {
            return (
                <Link href={`/orders/${params.row.id}`} passHref>
                    <Typography variant="body2"
                        color="text.secondary"
                        sx={{
                            cursor: "pointer",
                            textDecoration: "underline"
                        }}
                    >
                        Ver detalle
                    </Typography>
                </Link>
            )
        }
    },
];

const rows = [
    {
        id: 1, fullname: "Juan Perez",
        paid: true,
    },
    {
        id: 2, fullname: "Alejandro Martinez",
        paid: false,
    },
    {
        id: 3, fullname: "Maria Lopez",
        paid: true,
    },
    {
        id: 4, fullname: "Jose Perez",
        paid: false,
    },
    {
        id: 5, fullname: "Paola Diaz",
        paid: true,
    },
]
const OrdersPage = () => {
    return (
        <ShopLayout title="Historial de compras"
            description="Historial de compras de usuario"

        >
            <Grid container
                mt={2}
                sx={{
                    width: {
                        xs: "100%",
                        sm: "560px",
                        md: "840px",
                        lg: "1200px",
                    }
                }}

            >

                <Grid item xs={12}

                >
                    <Typography variant="h4" component="h1" gutterBottom>
                        Historial de compras
                    </Typography>
                </Grid>

                <Grid item xs={12}
                    height={600}
                >
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
    )
}

export default OrdersPage