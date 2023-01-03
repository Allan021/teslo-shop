import { useRouter } from "next/router";
import { signIn, getSession } from "next-auth/react";
import React, { useMemo, useState } from "react";
import {
  Button,
  Chip,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { AuthLayout } from "../../components/layouts";
import { useForm } from "react-hook-form";
import { validations } from "../../utils";
import { GetServerSideProps } from "next";
import { useProviders } from "../../hooks";
type FormFields = {
  email: string;
  password: string;
};
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();
  const [showMessage, setShowMessage] = useState(false);
  const router = useRouter();

  const redirectTo = useMemo(() => {
    const redirect_to = router.query.redirect_to as string;
    const url = redirect_to ? redirect_to : "";
    return url;
  }, [router.query.redirect_to]);

  const providers = useProviders();

  const onSubmit = async ({ email, password }: FormFields) => {
    setShowMessage(false);

    await signIn("credentials", {
      email,
      password,
    });
  };
  return (
    <AuthLayout title="Login Page">
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

        <Typography variant="h1" component="h1" gutterBottom sx={{ mt: 3 }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
            label="Usuario o contraseña incorrectos"
            color="error"
            sx={{
              width: "100%",
              mb: 1,
              display: showMessage ? "flex" : "none",
            }}
          />
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            sx={{ width: "100%" }}
          >
            <Link
              href={`
              /auth/register${redirectTo ? `?redirect_to=${redirectTo}` : ""}
            `}
              passHref
            >
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                ¿No tienes cuenta? Registrate
              </Typography>
            </Link>
          </Box>

          <Button
            variant="contained"
            fullWidth
            sx={{ borderRadius: 30, mt: 2 }}
            size="large"
            type="submit"
          >
            Iniciar Sesión
          </Button>

          {providers && (
            <Box sx={{ mt: 2 }}>
              <Divider sx={{ my: 2, width: "90%" }} />

              <Typography variant="body2" sx={{ textAlign: "center" }}>
                O inicia sesión con
              </Typography>

              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                {Object.values(providers).map((provider) => {
                  if (provider.type !== "oauth") {
                    return <div key={provider.name} />;
                  }

                  return (
                    <Button
                      key={provider.name}
                      variant="contained"
                      onClick={() => signIn(provider.id)}
                      fullWidth
                    >
                      {provider.name}
                    </Button>
                  );
                })}
              </Stack>
            </Box>
          )}
        </form>
      </Paper>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { redirect_to = "/" } = query;
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: redirect_to as string,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
export default LoginPage;
