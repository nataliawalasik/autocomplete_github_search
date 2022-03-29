import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 16px;
`;

export const DropdownContainer = styled.div`
  width: 300px;
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  height: 20px;

  border: 1px solid #ced4da;
  border-radius: 6px;

  &:focus {
    border-color: #7952b3;
  }
`;

interface DropdownProps {
  visible: boolean;
}

export const DropdownBox = styled.div<DropdownProps>`
  width: 100%;
  min-height: 50px;
  max-height: 200px;
  overflow-y: scroll;

  position: absolute;
  top: 100%;
  left: 0;
  right: 0;

  border: 1px solid #eef2ea;
  border-radius: 6px;
  display: ${({ visible }) => (visible ? "block" : "none")};
`;

export const ListWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const TextContainer = styled.div`
  padding-top: 10px;
`;
