import styled, { keyframes } from "styled-components";

const Animation = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg)
  }
`;

export const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 30px;
  height: 30px;
  animation: ${Animation} 1s linear infinite;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5px;
`;
