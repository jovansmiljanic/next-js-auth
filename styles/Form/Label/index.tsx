import styled, { css } from "styled-components";

interface LabelProps {
  size?: "small" | "medium" | "large";
  color?: string;
  block?: boolean;
  pointer?: boolean;
  fontWeight?: "normal" | "bold" | number;
}

export const Label = styled.label<LabelProps>`
  ${({ theme, size, color, block, pointer, fontWeight }) => css`
    display: ${block ? "block" : "inline"};
    cursor: ${pointer ? "pointer" : "default"};
    font-size: ${
      size === "small" ? "12px" : size === "large" ? "16px" : "14px" // Default to medium
    };
    color: ${color || theme.colors.textColorPrimary};
    margin-bottom: ${theme.defaults.gutter * 4}px;
    font-weight: ${fontWeight || "normal"};
  `}
`;
