import { CategoryOutlined,  } from '@mui/icons-material'
import { Button, CardMedia, Grid, Stack } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { AdminLayout } from '../../components/layouts'
import useSWR from 'swr';
import { IProduct } from '../../interfaces';



const columns:GridColDef[] = [
    { field: 'img', headerName: 'Foto',
renderCell: (params) => (
    <a href={`/product/${params.row.slug}`}>
       <CardMedia component='img' image={params.row.img} sx={{width:100, height:100}}
       className='fadeIn'
       />
    </a>
    
)
},
    { field: 'title', headerName: 'Titulo del Producto', width: 300 },
    { field: 'gender', headerName: 'Género' },
    { field: 'type', headerName: 'Tipo'},
    { field: 'inStock', headerName: 'Inventario' },
    { field: 'price', headerName: 'Precio' },
    { field: 'sizes', headerName: 'Tallas', width: 300 },
    { field:'actions', headerName: 'Acciones', width: 300,
    renderCell: (params) => (
    <a href={`/admin/products/${params.row.slug}`}
    role='button' rel='noreferrer'
    >
        Editar
    </a>
)
}


];



const ProductsPage = () => {
    const { data, error } = useSWR<IProduct[]>('/api/admin/products');
    if ( !data && !error ) return (<></>);
    const rows = data!.map( product => ({
        id: product._id,
        img:product.images[0],
        title:product.title,
        gender:product.gender,
        type:product.type,
        inStock:product.inStock,
        price:product.price,
        sizes:product.sizes.join(', '),
        slug:product.slug,
    }));

  return (
    <AdminLayout 
    title={`Productos (${data!.length})`} 
    subtitle={'Mantenimiento de productos'}
    icon={ <CategoryOutlined /> }
>


   <Grid container className='fadeIn'
   mt={2}
   >
         <Grid item xs={12}>
            <Stack direction='row' justifyContent='flex-end'>
                <Button
                variant='contained'
                color='primary'
                href='/admin/products/new'
                >
                    Nuevo Producto
                </Button>
            </Stack>
            </Grid>

        <Grid item xs={12} sx={{ height:650, width: '100%',mt:2 }}>
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

export default ProductsPage