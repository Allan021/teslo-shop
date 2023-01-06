import { ConfirmationNumberOutlined,  } from '@mui/icons-material'
import { Chip, Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Link from 'next/link';

import { AdminLayout } from '../../components/layouts'
import { IOrder, IUser } from '../../interfaces';
import useSwr from 'swr';
import { currency } from '../../utils';


const columns:GridColDef[] = [
    { field: 'id', headerName: 'Orden ID', width: 250 },
    { field: 'email', headerName: 'Correo', width: 250 },
    { field: 'name', headerName: 'Nombre Completo', width: 300 },
    { field: 'total', headerName: 'Monto total', width: 300 },
    {
        field: 'isPaid',
        headerName: 'Pagada',
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

    { field: 'noProducts', headerName: 'No.Productos', align: 'center', width: 150 },
    {
        field: "view",
        headerName: "Ver Pedido",
        width: 150,
        sortable: false,
        editable: false,
        filterable: false,
    
        renderCell(params) {
          return (
            <Link href={`/admin/orders/${params.id}`} passHref>
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
    { field: 'createdAt', headerName: 'Creada en', width: 300 },

];


const OrdersPage = () => {
    const { data, error } = useSwr<IOrder[]>('/api/admin/orders');
    if ( !data && !error ) return (<></>);
    
    const rows = data!.map( order => ({
        id    : order._id,
        email : (order.user as IUser).email,
        name  : (order.user as IUser).name,
        total : order.total,
        isPaid: order.isPaid,
        noProducts: order.number0fItems,
        createdAt: currency.formatDateToSql(new Date(order.createdAt!)),
    }));

  return (
    <AdminLayout 
        title={'Ordenes'} 
        subtitle={'Mantenimiento de ordenes'}
        icon={ <ConfirmationNumberOutlined /> }
    >


       <Grid container className='fadeIn'
       mt={2}
       >
            <Grid item xs={12} sx={{ height:650, width: '100%' }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    pageSize={ 10 }
                    rowsPerPageOptions={ [10] }
                />

            </Grid>
        </Grid>


    </AdminLayout>
  )
}

export default OrdersPage