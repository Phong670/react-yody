import styled from "styled-components";
import { Link } from "react-router-dom";

export const ItemList = styled.div`
  width: 100% !important;
  max-width: 226px !important;
  /* height: 300px; */
  /* max-height: 400px; */
  /* margin-bottom: 40px; */
  /* margin: 10px 10px; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
  overflow: hidden;
  /* border-radius: 8px; */
  /* box-shadow: 5px 5px 5px #798896; */

  @media (max-width: 450px) {
    /* max-height: 280px; */
  }
  @media (max-width: 350px) {
    /* max-height: 220px; */
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
  border-radius: 8px;
  &:hover {
    transform: scale(1.07);
    transition: all 0.7s;
    z-index: -99;
  }
  @media (max-width: 500px) {
    height: 83%;
  }
  @media (max-width: 350px) {
    height: 82%;
  }
`;
export const Info = styled.div`
  width: 100%;
  /* height: 20%; */
  position: relative;
  background-color: #ffff;
  padding: 8px 0px 0px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 1;
  @media (max-width: 500px) {
    /* height: 20% !important; */
    font-size: 14px;
  }
  @media (max-width: 350px) {
    /* height: 25% !important; */
  }
`;
export const CustomLink = styled(Link)`
  width: 100%;
  height: 100%;
`;
export const Title = styled.h2`
  max-width: 100%;
  font-weight: 500;
  &:hover {
    color: #fcaf17;
  }
  @media (max-width: 500px) {
    /* display: flex;
    flex-wrap: wrap; */
    max-height: 35px;
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;
export const Price = styled.h4`
  /* height: 20px; */
  font-size: 16px;
  font-weight: 650;
  color: #cd151c !important;
`;
