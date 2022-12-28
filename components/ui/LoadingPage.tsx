import { Box, CircularProgress, Typography } from "@mui/material"

export const LoadingPage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                height: 'calc(100vh - 300px)',
                justifyContent: 'center',
                alignItems: 'center',
                width: '1440px',
                flexDirection: 'column',
            }}
        >
            {/* Loading content with mui */}

            <CircularProgress
                size={100}
                thickness={4}

            />

            <Typography
                mt={2}
                variant="body1"
                sx={{
                    fontWeight: 600,
                    fontSize: '1.2rem'
                }}
            >
                Cargando...
            </Typography>
        </Box>
    )
}
