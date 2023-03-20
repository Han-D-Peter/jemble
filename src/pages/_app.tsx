import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RecoilRoot } from "recoil";
import { css, Global, ThemeProvider } from "@emotion/react";
import { OverlayProvider } from "@toss/use-overlay";
import theme from "@/styles/defaultTheme";
import defaultGlobalStyles from "@/styles/defaultGlobalStyles";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Global
            styles={css`
              ${defaultGlobalStyles}
            `}
          />
          <ThemeProvider theme={theme}>
            <OverlayProvider>
              <Component {...pageProps} />
            </OverlayProvider>
          </ThemeProvider>
        </RecoilRoot>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
