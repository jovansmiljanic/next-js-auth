// Fonts
import { Comfortaa } from "next/font/google";

import Providers from "@/lib/providers";

// Store context
import { Store } from "@/context";

// Global context
import { Layout } from "@/components/Layout";

import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const comfortaa = Comfortaa({
  subsets: ["latin"],
});

export const metadata = {
  title: "App name",
  description: "App description",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme")! as { value: "light" | "dark" };

  const session = await getServerSession(authOptions);

  return (
    <Store theme={!theme ? "light" : theme.value}>
      <Providers session={session}>
        <html className={comfortaa.className}>
          <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width" />

            <title>App name</title>
          </head>

          <body>
            <Layout>{children}</Layout>
          </body>
        </html>
      </Providers>
    </Store>
  );
}
