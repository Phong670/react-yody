import styled from "styled-components";

export const wrapperSectionPromotion = styled.div`
  width: 100%;
  max-width: 1200px;
  @media (max-width: 1200px) {
    display: none;
  }
`;
export const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  background-image: url("https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/banner-home-khuyen-mai.png?1681785617822");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
`;
export const TestPromotion = styled.div`
  width: 248px;
  height: 62px;
  background-color: #ffb801;
  font-size: 36px;
  font-weight: 70px;
  color: #ffff;
  border-radius: 15px;
  position: absolute;
  top: 32px;
  left: 226px;
`;
export const ContainerItem = styled.div`
  width: 500px;
  height: 200px;
  position: absolute;
  top: 0px;
  left: 500px;
`;
export const Img = styled.img`
  width: 80%;
  border-radius: 999px;
`;
export const Content = styled.div`
  width: 180px;
  margin-top: 4px;
  font-size: 16px;
  font-weight: 600;
  color: #11006f;
  padding: 0 10px;
`;
export const ItemPromotion = styled.a`
  width: 150px;
  height: 180px;
  padding: 2px;

  transition: all 0.4s;
  &:hover {
    transform: translateY(-10px);
    transition: all 0.4s;
  }
  &:hover ${Img} {
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
      rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  }
  &:hover ${Content} {
    color: #ffb801;
  }
`;
