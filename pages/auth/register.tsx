import { useMemo, useState } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { Button, Chip, Paper, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { AuthLayout } from "../../components/layouts";
import { validations } from "../../utils";
import { useAuthContext } from "../../context/auth/AuthContext";
import { useRouter } from "next/router";
type FormFields = {
  email: string;
  password: string;
  name: string;
};
const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { registerUser } = useAuthContext();
  const router = useRouter();

  const redirectTo = useMemo(() => {
    const redirect_to = router.query.redirect_to as string;
    const url = redirect_to ? redirect_to : "";
    return url;
  }, [router.query.redirect_to]);

  const onSubmit = async (data: FormFields) => {
    const { hasError, message } = await registerUser(data);

    if (hasError) {
      setErrorMessage(message || "");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }

    router.push(redirectTo);
  };
  return (
    <AuthLayout title="Register Page">
      <Paper
        elevation={2}
        sx={{
          p: 3,
          width: 350,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Image src="/teslo.svg" width={40} height={40} alt="logo" />
          <Typography variant="h4" component="h1" gutterBottom>
            eslo
          </Typography>
        </Stack>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Typography
            variant="h1"
            component="h1"
            textAlign={"center"}
            gutterBottom
            sx={{ mt: 3 }}
          >
            Register
          </Typography>
          <TextField
            label="Fullname"
            variant="outlined"
            sx={{ my: 2 }}
            type="text"
            fullWidth
            {...register("name", {
              required: "El nombre es requerido",
              minLength: {
                value: 3,
                message: "El nombre debe tener al menos 3 caracteres",
              },
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Email"
            variant="outlined"
            sx={{ my: 2 }}
            type="email"
            fullWidth
            {...register("email", {
              required: "El email es requerido",
              validate: validations.isEmail,
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            variant="outlined"
            sx={{ my: 2 }}
            type="password"
            fullWidth
            {...register("password", {
              required: "La contraseña es requerida",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Chip
            className="fadeIn"
            label={errorMessage || ""}
            color="error"
            sx={{
              width: "100%",
              mb: 1,
              display: !!errorMessage ? "flex" : "none",
            }}
          />
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            sx={{ width: "100%" }}
          >
            <Link
              href={`/auth/login${
                redirectTo ? `?redirect_to=${redirectTo}` : ""
              }`}
              passHref
            >
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                ¿Ya tienes una cuenta? Inicia Sesión
              </Typography>
            </Link>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ borderRadius: 30, mt: 2 }}
            size="large"
          >
            Iniciar Sesión
          </Button>
        </form>
      </Paper>
    </AuthLayout>
  );
};

export default RegisterPage;
