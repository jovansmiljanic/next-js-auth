// Core types
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";

import { ErrorOutline } from "@styled-icons/material-outlined/ErrorOutline";

import { Heading } from "@/components";

const FormErrorWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;

  padding: 10px 30px;
  margin-bottom: 1rem;

  ${({ theme: { colors } }) => css`
    color: ${colors.white};
    background-color: ${colors.danger};
  `}
`;

interface FormIError {
  message: string | undefined;
}

export const FormError: FC<FormIError> = ({ message }) => {
  if (!message) return null;

  return (
    <FormErrorWrap>
      <ErrorOutline width={35} height={35} />

      <Heading
        as="h6"
        $weight="semiBold"
        $padding={{ xs: { left: 1 }, sm: { left: 1 }, md: { left: 1 } }}
      >
        {message}
      </Heading>
    </FormErrorWrap>
  );
};
