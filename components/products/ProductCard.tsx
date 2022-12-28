import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Box, Chip } from '@mui/material';
import Link from 'next/link';
import { FC, useMemo, useState } from 'react';
import { IProduct } from '../../interfaces';

interface Props {
  product: IProduct;
}
export const ProductCard: FC<Props> = ({
  product
}) => {

  const [isHovered, setIsHovered] = useState(false)

  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const productImage = useMemo(() => {
    return isHovered ? `/products/${product.images[1]}` : `/products/${product.images[0]}`
  }, [
    isHovered,
    product.images
  ])

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={product.slug}>
      <Card
        sx={{
          minWidth: {
            xs: 313,
          }
        }}
      >
        <Link
          href={`/product/${product.slug}`}
          passHref
          prefetch={false}
        >
          <CardActionArea>

            {
              product.inStock === 0 && (
                <Chip
                  label="No disponible"
                  color="primary"
                  sx={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    zIndex: 1
                  }}
                />
              )
            }
            <CardMedia
              onMouseEnter={() => {
                setIsHovered(true)
              }}
              onMouseLeave={() => setIsHovered(false)}
              component="img"
              src={productImage}
              alt={product.title}

              onLoad={() => {
                setIsImageLoaded(true)
              }}
            />
          </CardActionArea>
        </Link>

        <CardContent
          className="fadeIn"
          sx={{
            display: isImageLoaded ? 'block' : 'none'
          }}
        >
          <Typography variant="body1" component="h2"
            fontWeight="bold"
          >
            {product.title}
          </Typography>
          <Typography variant="body1" color="text.secondary"
            fontWeight="500"
          >
            ${product.price}
          </Typography>
        </CardContent>
      </Card>

    </Grid >
  )
}
