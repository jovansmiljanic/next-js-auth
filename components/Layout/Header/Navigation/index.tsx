"use client";

// Core types
import { type FC, useMemo } from "react";

// Vendors
import Link from "next/link";
import { motion } from "framer-motion";
import styled, { css } from "styled-components";

interface INavigation {
  toggled: boolean;
}

export const Navigation: FC<INavigation> = ({ toggled }) => {
  const menuVariants = useMemo(
    () => ({
      open: { x: 300, transition: { ease: "easeIn", duration: 0.4 } },
      closed: { x: -300, transition: { ease: "easeOut", duration: 0.4 } },
    }),
    []
  );

  return (
    <NavigationWrapper
      initial="closed"
      animate={toggled ? "open" : "closed"}
      variants={menuVariants}
    >
      <MobileHeader>
        {/* <Logo src="/logo.png" alt="Logo" /> */}
        <div>logo</div>

        <Links>
          <Link href="/">Home</Link>
        </Links>
      </MobileHeader>
    </NavigationWrapper>
  );
};

const NavigationWrapper = styled(motion.div)`
  position: fixed;
  left: -300px;
  top: 0;
  z-index: 10;

  width: 300px;
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;

  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  padding: 20px;

  ${({ theme: { breakpoints, colors } }) => css`
    background-color: ${colors.white};

    img {
      margin-bottom: 80px;
    }

    a {
      color: ${colors.textColorPrimary};
      padding: 10px 0;
    }
  `}
`;

const MobileHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  padding: 0 0 30px 0;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
`;

const Logo = styled.img`
  width: 80px;
`;
