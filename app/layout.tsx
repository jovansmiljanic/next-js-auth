// Fonts
import { Comfortaa } from "next/font/google";

import Providers from "@/lib/providers";

// Store context
import { Store } from "@/context";

// Global context
import { Layout } from "@/components/Layout";

import { cookies } from "next/headers";

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
  const cookieStore = cookies();
  const theme = cookieStore.get("theme")! as { value: "light" | "dark" };

  return (
    <html className={comfortaa.className}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />

        <title>App name</title>
      </head>

      <body>
        <Store theme={theme.value}>
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </Store>
      </body>
    </html>
  );
}
