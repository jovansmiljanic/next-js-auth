import styled, { css } from "styled-components";
import { darken, lighten } from "polished";

interface FieldProps {
  $hasError?: boolean;
  $halfSize?: boolean;
  info?: boolean;
  type?: string;
  readOnly?: boolean;
  size?: "small" | "medium" | "large";
}

// Define size-based styles
const sizeStyles = css<FieldProps>`
  ${({ size, theme }) => {
    switch (size) {
      case "small":
        return css`
          padding: ${theme.defaults.gutter * 6}px
            ${theme.defaults.gutter * 12}px;
          font-size: 14px;
        `;
      case "large":
        return css`
          padding: ${theme.defaults.gutter * 12}px
            ${theme.defaults.gutter * 24}px;
          font-size: 18px;
        `;
      default:
        // Medium and default case
        return css`
          padding: ${theme.defaults.gutter * 10}px
            ${theme.defaults.gutter * 20}px;
          font-size: 16px;
        `;
    }
  }}
`;

export const Field = styled.input<FieldProps>`
  outline: 0;
  -webkit-appearance: none;
  z-index: 0;
  width: 100%;
  border-radius: 5px;

  // Apply size-based styles
  ${sizeStyles}

  &:not([type="radio"]) {
    ${({ $halfSize }) =>
      $halfSize
        ? css`
            flex: 0 0 50%;
          `
        : css`
            flex: 0 0 100%;
          `}
  }

  ${({ theme, $hasError, readOnly }) => css`
    border: 1px solid
      ${$hasError ? theme.colors.danger : theme.colors.lightGray};
    color: ${theme.colors.textColorPrimary};
    background-color: ${readOnly ? theme.colors.hoverGray : "transparent"};

    &:focus {
      border-color: ${readOnly
        ? theme.colors.lightGray
        : theme.colors.secondary};
      outline: none;
    }

    // Placeholder styles
    ::placeholder {
      color: ${$hasError
        ? theme.colors.danger
        : darken(0.3, theme.colors.lightGray)};
    }

    // Error state styling
    ${$hasError &&
    `
      background-color: ${lighten(0.4, theme.colors.danger)};
    `}
  `}
`;
