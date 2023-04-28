import styled from "styled-components";
import { Link } from "react-router-dom";

export const MainCover = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
`;
export const Title = styled.h6`
  margin-bottom: 10px;
  font-size: 20px;
`;
export const ChildMain = styled.div`
  /* width: 800px; */
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
export const CustomLink = styled(Link)`
  width: 100%;
  height: 100%;
`;

//dasd
export const SideBarMenu = styled.div`
  width: 100%;
`;
export const WrapperMenuItem = styled.div`
  width: 200px;
  height: 200px;
`;

export const Content = styled.div`
  width: 180px;
  margin-top: 4px;
  font-size: 16px;
  font-family: "SVN-Gilroy";
  font-weight: 600;
  color: #11006f;
  padding: 0 10px;
`;
export const ItemPromotion = styled.a`
  width: 150px;
  height: 180px;
  padding: 2px;
  margin: 0 20px;

  transition: all 0.5s;
  &:hover {
    transform: translateY(-10px);
    transition: all 0.5s;
  }
  &:hover ${Content} {
    color: #ffb801;
  }
`;
export const MenuListContainer = styled.div`
  margin: 0 40px;
  overflow: hidden;
`;
