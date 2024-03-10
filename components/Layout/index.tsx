"use client";

// Core types
import type { FC } from "react";

// Local components
import { Header } from "./Header";
import { Footer } from "./Footer";
import type { Session } from "next-auth";

interface ILayout {
  children: React.ReactNode;
}

export const Layout: FC<ILayout> = ({ children }) => {
  return (
    <>
      <Header />

      {children}

      <Footer />
    </>
  );
};
