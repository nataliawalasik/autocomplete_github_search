import styled, { css } from "styled-components";

interface Props {
  isFocused: boolean;
}

export const Item = styled.li<Props>`
  padding: 2px 10px;
  height: 25px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  border-bottom: 1px solid #eef2ea;

  ${({ isFocused }) =>
    isFocused &&
    css`
      background: #eef2ea;
    `}
`;
