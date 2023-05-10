import styled from "styled-components";

export const Header = styled.div`
  width: 100%;
  background-image: url(https://bizweb.dktcdn.net/100/438/408/themes/899432/assets/background-header.png?1678673568653);
  /* background: url(//bizweb.dktcdn.net/100/438/408/themes/899432/assets/background-header.png?1678673568653); */
  background-repeat: no-repeat;
  background-size: 100% 100%;
  box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.05);

  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 992px) {
    background-image: none;
  }
`;
export const HeaderContainer = styled.div`
  width: 1200px;

  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;
export const HeaderTop = styled.div`
  display: flex;

  margin-top: 18px;
`;
export const HeaderBottom = styled.div``;

export const Nav = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin-bottom: 0;
  margin: 0;
  padding: 0;
`;
export const ItemBottom = styled.div`
  width: 120px;
  background-color: white;
  position: absolute;
  top: 30px;
  left: 120%;
`;
export const ItemTitle = styled.a`
  padding: 0 5px;
  position: relative;
  overflow: hidden;
  &:hover ${ItemBottom} {
    background-color: #fcaf17;
    transition: all 1s;
    left: -20%;
  }
`;

export const ChildNavList = styled.ul`
  display: none;
  z-index: 1;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.05);
  position: absolute;
  width: 220px;
  left: 0px;
  top: 30px;
  font-size: 40px;
  transition: all 0.7s;
  padding-left: 0;
`;
export const ItemNav = styled.ul`
  height: 25px;
  position: relative;
  transition: all 0.7s;
  &:hover ${ChildNavList} {
    display: block;
    transition: all 0.7s;
  }
`;
export const ChildNav = styled.li`
  margin-top: 1px;
  padding: 20px;
  display: flex;
  justify-content: start;
  align-items: center;
  &:hover {
    background-color: yellow;
  }
`;
export const InputCover = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Input = styled.input`
  height: 35px;
  border: none;
  border-radius: 4px;
  padding-left: 8px;
  border-radius: 8px 0 0 8px;
  font-family: inherit;
  font-size: 14px;
  &:focus {
    outline: none;
    border: 1px solid #ffa500 !important;
    /* border-color: #ffa500; */
  }
`;
export const SearchBtn = styled.button`
  height: 35px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 0px;
  background-color: orange;
  border-radius: 0 8px 8px 0;
`;
export const Cart = styled.div`
  font-size: 20px;
`;
export const Person = styled.div``;
export const BoxAddCart = styled.div`
  background: linear-gradient(180deg, #feecc7 0%, #fff 28.93%);
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.16);
`;
