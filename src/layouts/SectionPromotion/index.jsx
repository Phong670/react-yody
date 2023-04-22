import * as S from "./styles";

function SectionPromotion() {
  return (
    <S.wrapperSectionPromotion className="my-6">
      <S.ImageContainer>
        <S.TestPromotion className="flex justify-center align-items-center">
          ĐẶC BIỆT
        </S.TestPromotion>
        <S.ContainerItem className="flex justify-between align-items-center ">
          <S.ItemPromotion className="flex flex-col justify-center align-items-center ">
            <S.Img src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_khuyenmai_3_image.png?1681805101830"></S.Img>
            <S.Content className="flex justify-center align-items-center">
              Cho đơn hàng 850k
            </S.Content>
          </S.ItemPromotion>
          <S.ItemPromotion className=" flex flex-col justify-center align-items-center ">
            <S.Img src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_khuyenmai_3_image.png?1681805101830"></S.Img>
            <S.Content className="flex justify-center align-items-center">
              Cho đơn hàng 850k
            </S.Content>
          </S.ItemPromotion>
          <S.ItemPromotion className="flex flex-col justify-center align-items-center ">
            <S.Img src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_khuyenmai_3_image.png?1681805101830"></S.Img>
            <S.Content className="flex justify-center align-items-center">
              Cho đơn hàng 850k
            </S.Content>
          </S.ItemPromotion>
        </S.ContainerItem>
      </S.ImageContainer>
    </S.wrapperSectionPromotion>
  );
}

export default SectionPromotion;
