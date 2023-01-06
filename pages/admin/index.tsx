import useSwr from 'swr';
import { Grid } from '@mui/material';
import { AdminLayout } from '../../components/layouts/';
import { SummaryCard } from '../../components/admin/';
import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, CreditCardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from '@mui/icons-material';
import { IDashboardResponse } from '../../interfaces';
import { LoadingPage } from '../../components/ui';
import { useEffect, useState } from 'react';

const AdminDashboard = () => {

  const {data,isLoading,error}=  useSwr<IDashboardResponse>('/api/admin/dashboard',{
        refreshInterval: 1000 * 30 // 30 seconds  
    })

    const [timeToRefresh, setTimeToRefresh] = useState(30)

    useEffect(() => {
    const interval = setInterval(() => {
        setTimeToRefresh((prev)  =>  prev > 0 ? prev - 1 : 30)
    }, 1000)

  return () => {

    clearInterval(interval)
  }
}, [])


    if(isLoading){
        return <LoadingPage />
    }

    if(error || !data){
        console.log(error)
        return <div>error</div>
    }

    const {lowInventory,
        notPaidOrders,
        numberOfClients,
        numberOfOrders,
        numberOfProducts,
        paidOrders,
        productsWithNoInventory
    }= data



  return (
    <AdminLayout title="Dashboard" subtitle="Bienvenido al Dashboard de teslo shop">
       <Grid container spacing={2} mt={2}>
        <SummaryCard value={numberOfOrders} subTitle="Ordenes totales" 
            icon={<CreditCardOutlined
            fontSize="large"
            color="secondary"
            />}
        />
           <SummaryCard value={paidOrders}
             subTitle="Ordenes pagadas"
             icon={ <AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} /> }
        />
           <SummaryCard value={notPaidOrders}
              subTitle="Ordenes pendientes"
              icon={ <CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} /> }
        />
           <SummaryCard value={numberOfClients}
             subTitle="Clientes"
                icon={ <GroupOutlined color="primary" sx={{ fontSize: 40 }} /> }
        />
           <SummaryCard value={numberOfProducts}
            subTitle="Productos"
            icon={ <CategoryOutlined color="warning" sx={{ fontSize: 40 }} /> }
        />
           <SummaryCard value={productsWithNoInventory}
                     subTitle="Sin existencias"
                     icon={ <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} /> }
        />
           <SummaryCard value={lowInventory}
              subTitle="Bajo inventario"
              icon={ <ProductionQuantityLimitsOutlined color="warning" sx={{ fontSize: 40 }} /> }
        />
           <SummaryCard value={timeToRefresh}
              subTitle="Actualización en:"
              icon={ <AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} /> }
        />
        </Grid>
    </AdminLayout>
  )
}

export default AdminDashboard