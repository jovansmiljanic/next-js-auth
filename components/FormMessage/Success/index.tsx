// Core types
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";

import { Heading } from "@/components";
import { SuccessIcon } from "@/public/svg";

const FormSuccessWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;

  padding: 10px 30px;
  margin-bottom: 1rem;

  ${({ theme: { colors } }) => css`
    color: ${colors.white};
    background-color: ${colors.success};
  `}
`;

interface IFormSuccess {
  message: string | undefined;
}

export const FormSuccess: FC<IFormSuccess> = ({ message }) => {
  if (!message) return null;

  return (
    <FormSuccessWrap>
      <SuccessIcon width={35} height={35} color="white" />

      <Heading
        as="h6"
        $weight="semiBold"
        $padding={{ xs: { left: 1 }, sm: { left: 1 }, md: { left: 1 } }}
      >
        {message}
      </Heading>
    </FormSuccessWrap>
  );
};
