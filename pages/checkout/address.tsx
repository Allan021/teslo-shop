import React from 'react'
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';


const AdressPage = () => {
    return (
        <ShopLayout title="Dirección de envío"
            description="Dirección de envío"
        >


            <Paper sx={{
                padding: 4,
                width: "100%",
            }}>
                <Typography
                    mb={2}
                    variant="h1" component="h1">
                    Dirección de envío
                </Typography>

                <Grid container spacing={2}
                >

                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth
                            variant="outlined"
                            placeholder='Nombre'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth
                            variant="outlined"
                            placeholder='Apellido'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth
                            variant="outlined"
                            placeholder='Teléfono'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth
                            variant="outlined"
                            type={"email"}
                            placeholder='Email'

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth
                            variant="outlined"
                            placeholder='Dirección 1'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth
                            variant="outlined"
                            placeholder='Dirección 2 (opcional)'
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth
                            variant="outlined"
                            placeholder='Departamento'
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth
                            variant="outlined"
                            placeholder='Ciudad'
                        />
                    </Grid>


                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth
                            variant="outlined"
                            placeholder='Código postal'
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="pais-label">Pais de envío</InputLabel>
                            <Select
                                labelId="pais-label"
                                id="demo-simple-select"
                                label="Pais de envío"
                            >
                                <MenuItem value={0}>Honduras</MenuItem>
                                <MenuItem value={1}>El Salvador</MenuItem>
                                <MenuItem value={2}>Guatemala</MenuItem>

                            </Select>
                        </FormControl>
                    </Grid>

                </Grid>
                <Box
                    display={"flex"}
                    mt={4}
                    sx={{
                        justifyContent: {
                            xs: "center",
                            sm: "flex-end"
                        }
                    }}
                >
                    <Button
                        size='large'
                        sx={{
                            borderRadius: 30,
                        }}
                    >
                        Revisa tu orden
                    </Button>

                </Box>

            </Paper>


        </ShopLayout >
    )
}

export default AdressPage