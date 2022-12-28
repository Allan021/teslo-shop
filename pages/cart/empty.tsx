import { RemoveShoppingCartOutlined, ShoppingCartOutlined } from "@mui/icons-material"
import { Button, Stack, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"
import NextLink from 'next/link';

const CartEmpty = () => {
    return (
        <ShopLayout
            title={'Carrito vacío'}
            description={'No hay productos en el carrito'}
        >
            <Stack
                justifyContent={'center'}
                alignItems={'center'}

                sx={{
                    height: `calc(100vh - 200px)`
                }}
            >
                <RemoveShoppingCartOutlined sx={{
                    fontSize: 100,
                    mb: 2,
                }} />
                <Typography variant={'h1'} component={'h1'}
                    mb={1}
                >
                    Carrito vacío
                </Typography>

                <Typography variant={'body1'} component={'h2'}
                    mb={4}
                    fontWeight={500}
                    textAlign={'center'}
                >
                    Antes de continuar a pagar, agrega productos al carrito. <br />
                    Encontrarás productos de gran calidad y a buen precio en nuestra tienda.
                </Typography>

                <NextLink href={'/'} passHref>
                    <Button
                        size="large"
                        startIcon={<ShoppingCartOutlined />}
                        variant={'contained'}
                    >
                        Ir a la tienda
                    </Button>
                </NextLink>
            </Stack>
        </ShopLayout>
    )
}

export default CartEmpty