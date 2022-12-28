import { GetServerSideProps, NextPage } from 'next';
import { Box, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"
import { ProductList } from "../../components/products"

import { IProduct } from "../../interfaces"
import { dbProducts } from '../../database';


interface SearchPageProps {
    products: IProduct[]
    search: string,
    hasProducts: boolean
}

const SearchPage: NextPage<SearchPageProps> = ({
    products,
    search,
    hasProducts
}) => {


    return (
        <ShopLayout
            title="Teslo Shop | Results of search"
            description="Results of search page of Teslo shop"
        >

            <Typography variant="h1"
                mb={2}
            >
                Teslo
            </Typography>

            {hasProducts ?
                <Typography variant="h2"
                    marginBottom={4}

                >
                    Resultados de la busqueda de : <b
                        style={{ textTransform: "capitalize" }}
                    >{search}</b>
                </Typography> :
                <Box>
                    <Typography variant="h2"
                    >
                        No se encontraron resultados para: <b
                            style={{ textTransform: "capitalize" }}

                        >{search}</b>
                    </Typography>
                    <Typography variant="body1"
                        marginBottom={4}
                    >
                        Estos son algunos productos que te pueden interesar
                    </Typography>
                </Box>
            }


            <ProductList products={products} />


        </ShopLayout >
    )
}



export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { query } = ctx.params as { query: string }

    if (!query) return {
        redirect: {
            destination: '/',
            permanent: true
        }
    }

    let products = await dbProducts.getProductsBySearch(query);

    const hasProducts = products.length > 0;

    if (!hasProducts) {
        products = await dbProducts.getProductsBySearch(
            "shirt"
        );
    }



    //TODO: Add neary products

    return {
        props: {
            products,
            search: query,
            hasProducts
        }
    }

}

export default SearchPage