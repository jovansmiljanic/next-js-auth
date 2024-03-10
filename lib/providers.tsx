"use client";

// Vendor types
import type { Session } from "next-auth";

// Local registry
import StyledComponentsRegistry from "./registry";

// GLobal styles
import GlobalStyle from "@/styles/globalStyles";

// Vendors
import { SessionProvider } from "next-auth/react";

const Providers = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  return (
    <SessionProvider session={session}>
      <StyledComponentsRegistry>
        <GlobalStyle />

        {children}
      </StyledComponentsRegistry>
    </SessionProvider>
  );
};

export default Providers;
