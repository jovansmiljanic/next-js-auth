"use client";

import { User } from "@/types";
// Core types
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";

const Users = styled.div`
  ${({ theme: { defaults, colors, font, ...theme } }) => css``}
`;

interface IUsers {
  users: User[];
}

const index: FC<IUsers> = ({ users }) => {
  console.log(users);

  return (
    <Users>
      {users.map((user, i) => (
        <div key={i}>{user.name}</div>
      ))}
    </Users>
  );
};

export { index as Users };
