import { FC } from "react"
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import styles from './ProductSlidesShow.module.css'
interface ProductSlidesShowProps {
    images: string[]
}
export const ProductSlidesShow: FC<ProductSlidesShowProps> = ({ images }) => {
    return (
        <Slide
            easing="ease"
            duration={7000
            }
            indicators={true}
        >
            {images.map((image, index) => {

                const url = `/products/${image}`

                return (
                    <div className={styles['each-slide']} key={index}>
                        <div style={{
                            backgroundImage: `url(${url})`,
                            backgroundSize: 'cover',
                        }}>
                        </div>
                    </div>
                )
            })}
        </Slide>
    )
}
