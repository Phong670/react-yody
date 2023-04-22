import styled from "styled-components";
import { Link } from "react-router-dom";

export const MainCover = styled.div`
  width: 1200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
`;
export const Title = styled.h6`
  margin-bottom: 10px;
  font-size: 20px;
`;
export const ChildMain = styled.div`
  height: 380px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
`;
export const SideBar = styled.div`
  width: 200px;
  height: 100%;
  background-color: #d18686;
  border-radius: 8px;
  overflow: hidden;
`;
export const ImgSideBar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  object-position: center;
  cursor: pointer;
`;
export const MainContainer = styled.div`
  height: 100%;
  display: flex;

  align-items: flex-start;
  flex-wrap: nowrap;
  overflow: hidden;
  margin-left: 80px;
`;
export const ItemList = styled.div`
  width: 200px !important;
  height: 100%;
  background-color: #b8c3cd;
  margin-bottom: 40px;
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 5px 5px 5px #798896;
`;
export const Img = styled.img`
  width: 100%;
  height: 80%;
  object-position: center;
  object-fit: fill;
  transition: all 0.7s;
  overflow: hidden;
  z-index: -99;
  &:hover {
    transform: scale(1.2);
    transition: all 0.7s;
    z-index: -99;
  }
`;
export const Infor = styled.div`
  width: 100%;
  height: 20%;
  position: relative;
  background-color: #b8c3cd;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 99;
`;
export const CustomLink = styled(Link)`
  width: 100%;
  height: 100%;
`;
