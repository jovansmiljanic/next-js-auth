"use client";

// Core types
import type { FC } from "react";

// Form styles
import { Label, Field, Errorgroup } from "@/styles/Form";

// Vendors
import styled, { css } from "styled-components";
import { FormikValues, useFormikContext } from "formik";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme: { defaults, colors, font, ...theme } }) => css`
    margin: ${defaults.gutter}rem 0;
  `}
`;

const Group = styled.div`
  position: relative;
`;

interface IFormField {
  type: string;
  name: string;
  placeholder?: string;
  label: string;
  customCode?: JSX.Element;
}

export const FormField: FC<IFormField> = ({
  type,
  name,
  placeholder,
  label,
  customCode,
}) => {
  const { values, handleChange, handleBlur, errors, touched } =
    useFormikContext<FormikValues>();

  return (
    <Wrapper>
      <Label>{label}</Label>

      <Group>
        <Field
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values[name]}
          $hasError={Boolean(errors[name] && touched[name])}
        />

        {customCode && customCode}
      </Group>

      {errors[name] && (
        <Errorgroup>
          {errors[name] && touched[name] ? <>{errors[name]}</> : null}
        </Errorgroup>
      )}
    </Wrapper>
  );
};
