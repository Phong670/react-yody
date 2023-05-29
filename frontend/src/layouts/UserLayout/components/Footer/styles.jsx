import styled from "styled-components";
export const Footer = styled.div`
  display: flex;
  background-color: #1f2999;
  width: 100%;

  padding-bottom: 20px;
  padding-top: 20px;
  justify-content: center;
`;
export const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 900px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-center;
  }
  @media (max-width: 350px) {
    width: 100%;
  }
`;
export const LeftFooter = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  color: white;
  padding: 10px;
  @media (max-width: 900px) {
    width: 100%;
  }
  @media (max-width: 480px) {
    width: 100%;
  }
`;
export const Vision = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;
export const TitleRegister = styled.h6`
  color: white;
  font-size: 16px;
  margin-bottom: 4px;
`;
export const InputRegister = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  @media (max-width: 350px) {
    width: 100%;
  }
`;

export const InputEmail = styled.input`
  width: 80%;
  height: 50px;
  margin-top: 10px;
  border: 1px solid #fff;
  padding-left: 10px;
  border-radius: 8px 0 0 8px;
  background: rgba(255, 255, 255, 0.3);
  color: #fff;
  font-size: 16px;
  &:focus {
    outline: none;
  }
  @media (max-width: 900px) {
    width: 60%;
  }
  @media (max-width: 350px) {
    width: 60%;
  }
`;
export const BtnRegister = styled.button`
  width: 40%;
  height: 50px;
  margin-top: 10px;
  background-color: #ffffff;
  border: none;
  border-radius: 0 8px 8px 0;
  color: rgb(255, 184, 1);
  &:hover {
    background-color: rgb(255, 184, 1);
    color: #ffffff;
  }

  @media (max-width: 900px) {
    width: 20%;
  }
  @media (max-width: 350px) {
    width: 40%;
  }
  @media (max-width: 180px) {
    width: 50%;
  }
`;

export const Social = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  list-style: none;
  /* margin-left: 10px; */
  @media (max-width: 900px) {
    width: 80%;
    margin: auto;
    margin-top: 20px;
  }
  @media (max-width: 480px) {
    width: 100%;
  }
  @media (max-width: 350px) {
    display: none;
  }
`;
export const ItemSocial = styled.div`
  width: 60px;
  height: 60px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
`;
export const ItemSocialLink = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  margin-right: 4px;

  &:hover {
    transform: rotate(30deg);
    transition: all 0.5s;
  }
`;

export const MiddleFooter = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  padding: 10px;
  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const ListYodyFollow = styled.ul`
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  font-size: 30px;
  padding: 0;
  margin: 0;
  margin-top: 10px;
  list-style: none;
  @media (max-width: 900px) {
    ${(props) => (props.isShow ? "display: flex" : "display: none")}
  }
`;
export const YodyTitleFooter = styled.h6`
  width: 100%;
  color: white;
  display: flex;
  justify-content: start;
  align-items: flex-start;
  font-size: 16px;
  margin: 0;
`;
export const ItemFooterYody = styled.li`
  width: 100%;
  color: white;
  /* display: flex; */
  margin-top: 4px;
`;
export const ItemChildFooter = styled.a`
  margin-bottom: 2px;
  color: white;
  font-size: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &:hover {
    color: yellow;
  }
  @media (max-width: 350px) {
    width: 100%;
  }
`;

export const RightHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  flex: 1;
  padding: 10px;
  @media (max-width: 350px) {
    width: 100%;
  }
`;
export const Img = styled.img`
  width: 50%;
`;
export const Icon = styled.div`
  font-size: 20px;
  margin-right: 10px;
`;
export const Arrow = styled.div`
  @media (min-width: 900px) {
    display: none;
  }
  margin-left: 10px;
  margin-top: 2px;
`;
