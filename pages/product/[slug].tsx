import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { ProductSlidesShow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui';
import { dbProducts } from '../../database';
import { ICartProduct, IProduct } from '../../interfaces';
import { ISize } from '../../interfaces/product';
import { useCartContext } from '../../context';



interface Props {
    product: IProduct
}

const ProductPage: NextPage<Props> = ({ product }) => {
    const router = useRouter()
    const { addProduct } = useCartContext()
    const [tempProduct, setTempProduct] = useState<ICartProduct>({
        _id: product._id,
        image: product.images[0],
        price: product.price,
        size: undefined,
        slug: product.slug,
        title: product.title,
        gender: product.gender,
        quantity: 0,
        inStock: product.inStock
    })

    const onSelectedSize = (size: ISize) => {
        setTempProduct({
            ...tempProduct,
            size
        })
    }

    const onAddToCart = () => {
        if (!tempProduct.size || tempProduct.quantity === 0) return
        addProduct(tempProduct)
        router.push('/cart')
    }

    const onUpdatedQuantity = (quantity: number) => {
        setTempProduct({
            ...tempProduct,
            quantity
        })
    }


    return (
        <ShopLayout title={`${product.title.slice(0, 25)}`} description={`${product.description}`}
             image={product.images[0]}
        
        >
            <Grid container spacing={2}
                sx={{
                    px: {
                        xs: 2,
                        sm: 5,
                    }
                }}

            >
                <Grid item xs={12} sm={7}>
                    <ProductSlidesShow images={product.images} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                    >

                        {/* Title */}

                        <Typography variant={'h1'} component={'h1'}>
                            {product.title}
                        </Typography>

                        {/* Price */}
                        <Typography variant={'subtitle1'} component={'h1'}>
                            ${product.price}
                        </Typography>

                        < Box my={2}>

                            <Typography variant={'subtitle2'}

                            >
                                Cantidad
                            </Typography>

                            <Box mt={1}>
                                <ItemCounter value={
                                    tempProduct.quantity
                                } onChange={
                                    onUpdatedQuantity

                                }
                                    max={tempProduct.inStock}
                                    min={0}
                                />
                                <SizeSelector
                                    sizes={product.sizes}
                                    selectedSize={tempProduct.size}
                                    onSelectedSize={onSelectedSize}
                                />
                            </Box>

                        </Box>

                        {/**Add to cart button*/}

                        {
                            (product.inStock > 0) ? (
                                <Button
                                    sx={{
                                        borderRadius: 30
                                    }}

                                    onClick={onAddToCart}
                                >
                                    {
                                        tempProduct.size ? 'Agregar al carrito' : 'Selecciona un tamaño'
                                    }
                                </Button>
                            ) :
                                (
                                    <Chip label={'No hay disponibles'} color="error" />
                                )

                        }



                        <Box mt={3}>
                            <Typography variant='subtitle2'>
                                Descripción
                            </Typography>
                            <Typography variant='body2'>
                                {product.description}
                            </Typography>

                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ShopLayout >
    )
}


export const getStaticPaths: GetStaticPaths = async () => {
    const slugs = await dbProducts.getAllProductsSlugs();


    return {
        paths: slugs.map(({ slug }) => ({
            params: {
                slug
            }
        })),
        fallback: "blocking"
    }
}



export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { slug = "" } = params as { slug: string }

    const product = await dbProducts.getProductsBySlug(slug);

    if (!product) {
        return {
            redirect: {
                destination: '/404',
                permanent: false
            }
        }
    }

    return {
        props: {
            product
        },
        revalidate: 60 * 60 * 24
    }
}


export default ProductPage