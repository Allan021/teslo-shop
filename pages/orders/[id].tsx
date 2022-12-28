import React from 'react'
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { Button, Card, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import { CartList, OrderSumary, } from '../../components/cart';
import Link from 'next/link';
import { CheckCircleOutline } from '@mui/icons-material';

const OrdersPage = () => {
    return (
        <ShopLayout title="Orden de compra 12132"
            description="Resumen de compra"
        >

            <Typography variant="h4" component="h1" gutterBottom>
                Resumen de compra 123213123
            </Typography>
            <Grid container
                padding={2}
                spacing={4}

            >
                <Grid item xs={12} sm={7}>

                    <Chip
                        label="Enviado"
                        color="success"
                        variant="outlined"
                        icon={<CheckCircleOutline />}
                        sx={{
                            mb: 2
                        }}
                    />
                    <CartList

                    />


                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card sx={{ padding: 4 }}
                    >
                        <Typography variant="subtitle1" component="h3" >
                            Resumen de compra (4 productos)
                        </Typography>

                        <Divider
                            sx={{
                                my: 2
                            }}
                        />
                        <Stack
                            spacing={2}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            direction={"row"}
                        >
                            <Typography
                                variant="subtitle1"
                                lineHeight={2}
                            >
                                Dirección de envío
                            </Typography>
                            <Link href="/checkout/address">
                                <Typography color="primary" variant="body1" lineHeight={2}
                                    sx={{
                                        cursor: "pointer",
                                        textDecoration: "underline"
                                    }}
                                >
                                    Editar
                                </Typography>
                            </Link>


                        </Stack>
                        <Typography
                            color={"text.secondary"}
                            variant="body1"
                        >
                            Juan Perez
                        </Typography>
                        <Typography
                            color={"text.secondary"}
                            variant="body1"
                        >
                            Calle 123, Colonia 123, Ciudad 123
                        </Typography>

                        <Typography
                            color={"text.secondary"}
                            variant="body1"
                        >
                            Nashville, TN 37201
                        </Typography>

                        <Typography
                            color={"text.secondary"}
                            variant="body1"
                        >
                            Honduras
                        </Typography>

                        <Typography
                            color={"text.secondary"}
                            variant="body1"
                        >
                            +504 1234 5678
                        </Typography>

                        <Typography
                            color={"text.secondary"}
                            variant="body1"
                        >
                            juan.perez@gmail.com
                        </Typography>


                        <Divider
                            sx={{
                                my: 2
                            }}
                        />

                        <Stack
                            justifyContent={"flex-end"}
                            direction={"row"}
                        >
                            <Link href="/cart">
                                <Typography color="primary" variant="body1"
                                    sx={{
                                        cursor: "pointer",
                                        textDecoration: "underline"
                                    }}
                                >
                                    Editar
                                </Typography>
                            </Link>


                        </Stack>
                        <OrderSumary
                        />
                        <Divider
                            sx={{
                                my: 2
                            }}
                        />

                        <Stack
                            spacing={2}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            direction={"row"}
                        >

                            <Typography
                                variant="subtitle1"
                                lineHeight={2}
                            >
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

                        <Typography variant="h4" sx={{ mt: 2 }}>
                            Pagar
                        </Typography>
                        <Chip
                            label="Enviado"
                            color="success"
                            variant="outlined"
                            icon={<CheckCircleOutline />}
                            sx={{
                                mb: 2
                            }}
                        />
                    </Card>

                </Grid>
            </Grid>

        </ShopLayout>
    )
}

export default OrdersPage