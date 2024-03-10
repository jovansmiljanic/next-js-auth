"use client";

// Core types
import type { FC } from "react";

// Core
import { useContext, useEffect, useState } from "react";

// Store context
import { StoreContext } from "@/context";

// NextJS
import Link from "next/link";

// Vendors
import { useSession } from "next-auth/react";
import styled, { css } from "styled-components";

// Global components
import { Button, Heading } from "@/components";

// Local components
import { Navigation } from "./Navigation";
import { signOut } from "next-auth/react";

import { Moon } from "@styled-icons/feather/Moon";
import { Sun } from "@styled-icons/feather/Sun";
import { Session } from "next-auth";

const ThemeWrapper = styled.div`
  display: flex;

  ${({ theme: { defaults, colors, font, ...theme } }) => css`
    border: 1px solid ${colors.primary};
  `}
`;

const ThemeItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px;

  ${({ theme: { defaults, colors, font, ...theme } }) => css``}
`;

interface IHeader {
  session: Session | null;
}

export const Header: FC<IHeader> = ({ session }) => {
  const { isTablet, appTheme, setAppTheme } = useContext(StoreContext);

  const [toggled, setToggle] = useState<boolean>(true);

  useEffect(() => {
    setToggle(!isTablet);
  }, [isTablet]);

  return (
    <WrapperHeader>
      <Link href="/">Logo</Link>

      <ThemeWrapper>
        <ThemeItem onClick={() => setAppTheme("light")}>
          <Sun width={30} height={30} color="primary" />
          <Heading as="h6" $padding={{ md: { left: 1 } }}>
            Light
          </Heading>
        </ThemeItem>

        <ThemeItem onClick={() => setAppTheme("dark")}>
          <Moon width={30} height={30} color="primary" />
          <Heading as="h6" $padding={{ md: { left: 1 } }}>
            Dark
          </Heading>
        </ThemeItem>
      </ThemeWrapper>

      <Nav>
        <Heading as="h6" color="textColor">
          Home
        </Heading>

        {session && (
          <Button $variant="primary" $size="small" onClick={() => signOut()}>
            Sign out
          </Button>
        )}
      </Nav>

      {/* {isTablet && (
        <>
          <Navigation toggled={toggled} />
          <Toggler onClick={() => setToggle(!toggled)} />
        </>
      )} */}
    </WrapperHeader>
  );
};

const WrapperHeader = styled.div`
  position: relative;
  z-index: 100;

  max-width: 1340px;
  margin: auto;
  padding: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Toggler = styled.div`
  position: absolute;
  width: 40px;
  height: 25px;
  right: 20px;
  top: 49px;
  cursor: pointer;

  &:before {
    width: 100%;
    height: 2px;
    top: 50%;
    left: 0;
    position: absolute;
    content: "";
    transform: translateY(-50%);
  }

  &:after {
    width: 100%;
    height: 2px;
    top: 50%;
    left: 0;
    position: absolute;
    content: "";
    transform: translateY(50%);
  }

  ${({ theme: { colors } }) => css`
    border-top: 2px solid ${colors.black};
    border-bottom: 2px solid ${colors.black};

    &:before {
      background-color: ${colors.black};
    }
  `}
`;

const Nav = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  ${({ theme: { colors } }) => css`
    a {
      padding-right: 15px;
      color: ${colors.textColorPrimary};

      &:last-child {
        color: ${colors.white};
      }
    }
  `}
`;

const Logo = styled.img`
  width: 80px;
`;
