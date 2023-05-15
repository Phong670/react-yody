import styled from "styled-components";
import { Button, Form, Input } from "antd";
export const LoginWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/bg_login.jpg?1682348011396");
  @media (max-width: 620px) {
    background-image: none;
    background-color: #ffffffff;
  }
`;

export const LoginContainer = styled.div`
  background-color: white;
`;
export const ButtonCustom = styled(Button)`
  height: 50px;
  color: #ffffff !important;
  &:hover {
    border-color: #da991f !important;
  }
`;
