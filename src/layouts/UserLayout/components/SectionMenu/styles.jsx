import styled from "styled-components";

export const SideBarMenu = styled.div`
  width: 100%;
`;
export const WrapperMenuItem = styled.div`
  width: 200px;
  height: 200px;
`;
export const Img = styled.img`
  width: 120px;
  border-radius: 999px;
`;
export const Content = styled.div`
  max-width: 180px;
  min-width: 180px;
  margin-top: 4px;
  font-size: 16px;
  font-family: "SVN-Gilroy", sans-serif;
  font-weight: 600;
  color: #11006f;
  padding: 0 10px;
  @media (max-width: 676px) {
    font-size: 10px;
  }
`;
export const ItemPromotion = styled.a`
  width: 150px;
  padding: 2px;
  @media (max-width: 676px) {
    width: 16vw;
  }
  transition: all 0.5s;
  &:hover {
    transform: translateY(-10px);
    transition: all 0.5s;
  }
  &:hover ${Img} {
    box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.3);
  }
  &:hover ${Content} {
    color: #ffb801;
  }
`;
export const MenuListContainer = styled.div`
  margin: 0 40px;
`;
