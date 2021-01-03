import { Layout } from "../layout/Layout";
import Typography from "typography";

import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

import "../styles/globals.scss";

const typography = new Typography({
  baseFontSize: "16px",
  headerFontFamily: ["Rubik Mono One"],
  bodyFontFamily: ["Roboto"],
  overrideStyles: ({ rhythm }, options, styles) => ({
    h2: {
      fontSize: "clamp(0.9rem, 5vw + 1rem, 48pt)",
      letterSpacing: rhythm(1 / 13),
    },
    "h2, h4": {
      marginBottom: rhythm(1 / 6),
    },
    p: {
      marginBottom: rhythm(1 / 3),
    },
    img: {
      marginBottom: 0,
    },
  }),
});

typography.injectStyles();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

export default MyApp;
