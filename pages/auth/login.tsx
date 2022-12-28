import { Button, Paper, TextField, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AuthLayout } from '../../components/layouts'

const LoginPage = () => {
    return (
        <AuthLayout title="Login Page">
            <Paper elevation={2} sx={{
                p: 3,
                width: 350,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}

            >
                <Stack
                    direction="row"

                    spacing={0.5}
                    alignItems="center"
                >
                    <Image src="/teslo.svg" width={40} height={40}
                        alt="logo"
                    />
                    <Typography variant="h4" component="h1" gutterBottom>
                        eslo
                    </Typography>

                </Stack>

                <Typography variant="h1" component="h1" gutterBottom
                    sx={{ mt: 3 }}
                >
                    Login
                </Typography>
                <TextField label="Email" variant="outlined" sx={{ my: 2 }}
                    type="email"
                    fullWidth
                />
                <TextField label="Password" variant="outlined" sx={{ my: 2 }}
                    type="password"
                    fullWidth
                />

                <Box
                    display={"flex"}
                    justifyContent={"flex-end"}
                    sx={{ width: '100%' }}
                >
                    <Link
                        href="/auth/register"
                        passHref
                    >
                        <Typography variant="body2"
                            sx={{
                                textDecoration: 'underline',
                                cursor: 'pointer',
                            }}
                        >
                            ¿No tienes cuenta? Registrate
                        </Typography>
                    </Link>
                </Box>


                <Button variant="contained"
                    fullWidth
                    sx={{ borderRadius: 30, mt: 2 }}
                    size="large"
                >
                    Iniciar Sesión
                </Button>
            </Paper>
        </AuthLayout>
    )
}

export default LoginPage