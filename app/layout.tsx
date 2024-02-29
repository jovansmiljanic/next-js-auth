// Global styles
import GlobalStyle from "@/styles/globalStyles";

// Fonts
import { Comfortaa } from "next/font/google";

import Providers from "@/lib/providers";

// Store context
import { Store } from "@/context";

// Global context
import { Layout } from "@/components/Layout";

const comfortaa = Comfortaa({
  subsets: ["latin"],
});

export const metadata = {
  title: "App name",
  description: "App description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={comfortaa.className}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />

        <title>App name</title>
      </head>

      <body>
        <Providers>
          <GlobalStyle />

          <Store>
            <Layout>{children}</Layout>
          </Store>
        </Providers>
      </body>
    </html>
  );
}
