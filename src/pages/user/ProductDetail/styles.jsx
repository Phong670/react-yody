import styled from "styled-components";
import { Link } from "react-router-dom";

export const ItemList = styled.div`
  width: 220px !important;
  height: 360px;
  /* margin-bottom: 40px; */
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
  overflow: hidden;
  border-radius: 8px;
  /* box-shadow: 5px 5px 5px #798896; */
`;

export const CustomLink = styled(Link)`
  width: 100%;
  height: 100%;
`;

export const Image = styled.img`
  width: 100%;
  height: 80%;
  object-position: center;
  object-fit: fill;
  transition: all 0.7s;
  overflow: hidden;
  z-index: -99;
  &:hover {
    transform: scale(1.07);
    transition: all 0.7s;
    z-index: -99;
  }
`;
export const Infor = styled.div`
  width: 100%;
  height: 20%;
  position: relative;
  background-color: #ffff;
  padding: 8px 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 99;
`;
