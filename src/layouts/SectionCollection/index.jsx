import * as S from "./styles";

function SectionCollection() {
  return (
    <S.wrapperCollection className="my-6">
      <S.Title>BỘ SƯU TẬP</S.Title>
      <S.ImageContainer className="flex justify-between">
        <S.Img
          src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_bst_1_image.jpg?1681726130231"
          alt=""
        ></S.Img>
        <S.Img
          src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_bst_2_image.jpg?1681805101830"
          alt=""
        ></S.Img>
        <S.Img
          src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_bst_3_image.jpg?1681805101830"
          alt=""
        ></S.Img>
      </S.ImageContainer>
    </S.wrapperCollection>
  );
}

export default SectionCollection;
