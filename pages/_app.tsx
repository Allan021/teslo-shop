import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { lightTheme } from "../themes/";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { CartProvider, UIProvider } from "../context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (...args: [key: string]) =>
          fetch(...args).then((res) => res.json()),
      }}
    >
      <UIProvider>
        <CartProvider>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </CartProvider>
      </UIProvider>
    </SWRConfig>
  );
}
