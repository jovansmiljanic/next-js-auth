// Vendors
import styled, { css } from "styled-components";

export const Errorgroup = styled.div`
  font-size: 14px;
  padding: 4px;

  ${({ theme: { colors } }) => css`
    color: ${colors.danger};
  `}
`;
