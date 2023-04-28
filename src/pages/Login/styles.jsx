import styled from "styled-components";
import { Button, Form, Input } from "antd";
export const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: gray;
`;

export const LoginContainer = styled.div`
  padding: 50px;
  max-width: 500px;
  background-color: white;
`;
export const ButtonCustom = styled(Button)`
  &:hover {
    color: #ffffff !important;
    border-color: #da991f !important;
  }
`;
