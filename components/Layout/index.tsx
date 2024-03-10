"use client";

// Core types
import type { FC } from "react";

// Local components
import { Header } from "./Header";
import { Footer } from "./Footer";
import type { Session } from "next-auth";

interface ILayout {
  children: React.ReactNode;
  session: Session | null;
}

export const Layout: FC<ILayout> = ({ session, children }) => {
  return (
    <>
      <Header session={session} />

      {children}

      <Footer />
    </>
  );
};
