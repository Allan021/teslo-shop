import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import { lightTheme } from "../themes/";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { CartProvider, UIProvider } from "../context";
import { AuthProvider } from "../context/auth";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
const initialOptions = {
  "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PayPalScriptProvider options={initialOptions}>
    <SessionProvider>
      <SWRConfig
        value={{
          fetcher: (...args: [key: string]) =>
            fetch(...args).then((res) => res.json()),
        }}
      >
        <UIProvider>
          <AuthProvider>
            <CartProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
            </CartProvider>
          </AuthProvider>
        </UIProvider>
      </SWRConfig>
    </SessionProvider>
    </PayPalScriptProvider>
  );
}
