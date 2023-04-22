import * as S from "./styles";
import CarouselMenuSection from "../CarouselMenuSection";

function SectionPromotion() {
  const MenuList = ["NỮ", "NAM", "ÁO KHOÁC"];
  const renderMenuList = (menulist) => {
    return menulist.map((item, index) => {
      return (
        <S.ItemMenu
          key={index}
          className="flex justify-center align-items-center"
        >
          {item}
        </S.ItemMenu>
      );
    });
  };
  return (
    <S.WrapperSectionMenu className="flex flex-col justify-center align-items-center">
      <S.MenuList className="flex justify-between align-items-center">
        {renderMenuList(MenuList)}
      </S.MenuList>
      <CarouselMenuSection></CarouselMenuSection>
    </S.WrapperSectionMenu>
  );
}

export default SectionPromotion;
