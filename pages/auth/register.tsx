import { useRouter } from "next/router";
import { signIn, getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  Button,
  Chip,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { AuthLayout } from "../../components/layouts";
import { validations } from "../../utils";
import { useAuthContext } from "../../context/auth/AuthContext";
import { useProviders } from "../../hooks";
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
  const providers = useProviders();

  const redirectTo = useMemo(() => {
    const redirect_to = router.query.redirect_to as string;
    const url = redirect_to ? redirect_to : "";
    return url;
  }, [router.query.redirect_to]);

  const onSubmit = async (data: FormFields) => {
    const { hasError, message } = await registerUser(data);

    if (hasError) {
      setErrorMessage(message || "Error al registrar el usuario");
      return;
    }

    await signIn("credentials", {
      email: data.email,
      password: data.password,
    });
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

          {providers && (
            <Box sx={{ mt: 2 }}>
              <Divider sx={{ my: 2, width: "90%" }} />

              <Typography variant="body2" sx={{ textAlign: "center" }}>
                O Registrate con
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
export default RegisterPage;
