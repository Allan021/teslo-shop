import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../components/layouts/ShopLayout';

const CustomErrorPage = () => {
    return (
        <ShopLayout title={'Page Not Found'} description={'La pagina de productos no fue encontrada'}>
            <Box
                sx={{
                    display: 'flex',
                    height: 'calc(100vh - 204px)',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h1"
                    component={'h1'}
                    fontWeight={700}
                    fontSize={128}
                    sx={{
                        fontSize: {
                            xs: 48,
                            sm: 128,
                        }
                    }}
                >
                    404 |
                </Typography>
                <Typography variant="h1"
                    component={'h1'}
                    fontWeight={500}
                    fontSize={72}
                    marginLeft={1}
                    sx={{
                        fontSize: {
                            xs: 24,
                            sm: 72,
                        }
                    }}>
                    Página no encontrada
                </Typography>
            </Box>
        </ShopLayout >
    )
}

export default CustomErrorPage