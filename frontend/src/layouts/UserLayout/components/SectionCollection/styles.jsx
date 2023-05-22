import styled from "styled-components";

export const wrapperCollection = styled.div`
  width: 100%;
  overflow: hidden;
`;
export const Title = styled.div`
  width: 100%;
  /* height: 24px; */

  display: flex;
  align-items: center;
  /* font-family: "SVN-Gilroy"; */
  font-weight: 600;
`;
export const ImageContainer = styled.div`
  width: 100%;
`;
export const Img = styled.img`
  width: calc(100% / 3 - 16px);
  @media (max-width: 620px) {
    width: 100%;
  }
`;
