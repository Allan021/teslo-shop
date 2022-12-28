import { Box, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"
import { ProductList } from "../../components/products"
import { LoadingPage } from "../../components/ui"
import { useProducts } from "../../hooks"



export default function Kid() {

    const { products, isLoading } = useProducts("/products?gender=kid")

    return (
        <ShopLayout
            title="Teslo Shop | Kids"
            description="Kids page of Teslo shop"

        >

            <Typography variant="h1"
            >
                Teslo
            </Typography>

            <Typography variant="h2"
                marginBottom={4}
            >
                Todos los productos para niños
            </Typography>

            {
                isLoading ?
                    <LoadingPage /> :
                    <ProductList products={products} />
            }

        </ShopLayout >
    )
}
