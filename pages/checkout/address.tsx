import {
  Paper,
  Typography,
  Grid,
  TextField,
  FormControl,
  MenuItem,
  Box,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ShopLayout } from "../../components/layouts";
import { countries } from "../../database/countries";
import { useCartContext } from "../../context/cart/CartContext";
import { GetServerSideProps,  } from "next";
import { FC } from "react";
import Cookies from "js-cookie";

type FormData = {
  name: string;
  lastName: string;
  phone: string;
  address1: string;
  address2?: string;
  department: string;
  city: string;
  postalCode: string;
  country: string;
};


interface AddressPageProps{
  address: FormData
}

const AddressPage:FC<AddressPageProps> = ({address}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: address
  });

  const router = useRouter();
  const { updateAddress } = useCartContext();
  const onSubmit = (data: FormData) => {
    // Save data in cookies for each field in the form
    Object.keys(data).forEach((key) => {
      Cookies.set(key, data[key as keyof FormData] || "");
    });

    updateAddress(data);
    router.push("/checkout/summary");
  };

  return (
    <ShopLayout title="Dirección de envío" description="Dirección de envío">
      <Paper
        sx={{
          padding: 4,
          width: "100%",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Typography mb={2} variant="h1" component="h1">
            Dirección de envío
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Nombre"
                {...register("name", { required: "El nombre es requerido" })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Apellido"
                {...register("lastName", {
                  required: "El apellido es requerido",
                })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Teléfono"
                {...register("phone", { required: "El teléfono es requerido" })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Dirección 1"
                {...register("address1", {
                  required: "La dirección es requerida",
                })}
                error={!!errors.address1}
                helperText={errors.address1?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Dirección 2 (opcional)"
                {...register("address2")}
                error={!!errors.address2}
                helperText={errors.address2?.message}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Ciudad"
                {...register("city", { required: "La ciudad es requerida" })}
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Departamento"
                {...register("department", {
                  required: "El departamento es requerido",
                })}
                error={!!errors.department}
                helperText={errors.department?.message}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                variant="outlined"
                {...register("postalCode", {
                  required: "El código postal es requerido",
                })}
                placeholder="Código postal"
                error={!!errors.postalCode}
                helperText={errors.postalCode?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  select
                  id="demo-simple-select"
                  {...register("country", { required: "El país es requerido" })}
                  error={!!errors.country}
                  helperText={errors.country?.message}
                  defaultValue={address.country}
                >
                  {countries.map((country) => (
                    <MenuItem key={country.code} value={country.code}>
                      {country.name}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
          </Grid>
          <Box
            display={"flex"}
            mt={4}
            sx={{
              justifyContent: {
                xs: "center",
                sm: "flex-end",
              },
            }}
          >
            <Button
              type="submit"
              size="large"
              sx={{
                borderRadius: 30,
              }}
            >
              Revisa tu orden
            </Button>
          </Box>
        </form>
      </Paper>
    </ShopLayout>
  );
};


export const getServerSideProps: GetServerSideProps = async ({req}) => {

  const address:FormData = {
    name: req.cookies.name || "",
    lastName: req.cookies.lastName || "",
    phone: req.cookies.phone || "",
    address1: req.cookies.address1 || "",
    address2: req.cookies.address2 || "",
    department: req.cookies.department || "",
    city: req.cookies.city || "",
    postalCode: req.cookies.postalCode || "",
    country: req.cookies.country || "",
  };


  return {
    props:{
      address
    }
  }

}

export default AddressPage;
