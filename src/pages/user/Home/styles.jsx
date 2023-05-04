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

export const ChildMain = styled.div`
  /* width: 800px; */
  height: 380px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
`;
//aaa
export const ItemList = styled.div`
  width: 90% !important;
  max-width: 226px !important;
  height: 360px;
  max-height: 360px;
  /* margin-bottom: 40px; */
  margin: 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
  overflow: hidden;
  border-radius: 8px;
  /* box-shadow: 5px 5px 5px #798896; */

  @media (max-width: 450px) {
    max-height: 280px;
  }
  @media (max-width: 350px) {
    max-height: 220px;
  }
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
  @media (max-width: 500px) {
    height: 76%;
  }
  @media (max-width: 350px) {
    height: 70%;
  }
`;
export const Info = styled.div`
  width: 100%;
  height: 20%;
  position: relative;
  background-color: #ffff;
  padding: 8px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 1;
  @media (max-width: 500px) {
    height: 20% !important;
    font-size: 14px;
  }
  @media (max-width: 350px) {
    height: 25% !important;
  }
`;
export const CustomLink = styled(Link)`
  width: 100%;
  height: 100%;
`;
export const Title = styled.h2`
  max-width: 100%;
  font-weight: 500;
  @media (max-width: 500px) {
    /* display: flex;
    flex-wrap: wrap; */
    max-height: 35px;
    font-size: 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;
export const Price = styled.h4`
  height: 20px;
  font-size: 20px;
  font-weight: 650;
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
