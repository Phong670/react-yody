import styled from "styled-components";

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
  width: 1200px;
  height: 340px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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
  width: 1000px;
  height: 100%;
  /* background-color: #e91f29; */
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-left: 80px;
`;
export const ItemList = styled.div`
  width: 200px;
  height: 100%;
  background-color: #b8c3cd;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
  overflow: hidden;
  border-radius: 8px;
`;
export const Img = styled.img`
  width: 100%;
  height: 80%;
  object-position: center;
  object-fit: cover;
  transition: all 0.7s;
  overflow: hidden;
  &:hover {
    transform: scale(1.2);
    transition: all 0.7s;
  }
`;
export const Infor = styled.div`
  width: 100%;
  z-index: 1;
  background-color: #b8c3cd;

  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`;
