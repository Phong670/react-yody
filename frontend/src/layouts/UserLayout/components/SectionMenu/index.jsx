import * as S from "./styles";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/pagination";
import { useState } from "react";
function CarouselMenuSection() {
  const navigate = useNavigate();

  const [gender, setGender] = useState(1);
  const menuListFemale = [
    {
      id: 5,
      img: "https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_danhmuc_1_child_3_image.png?1683124677097",
      title: "ÁO",
    },
    {
      id: 6,
      img: "https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_danhmuc_1_child_5_image.png?1683124677097",
      title: "QUẦN",
    },
    {
      id: 8,
      img: "https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_danhmuc_1_child_6_image.png?1683124677097",
      title: "VÁY",
    },
    {
      id: 7,
      img: "https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_danhmuc_1_child_2_image.png?1683124677097",
      title: "ĐỒ THỂ THAO",
    },
  ];
  const menuListMale = [
    {
      id: 1,
      img: "https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_danhmuc_2_child_6_image.png?1683124677097",
      title: "ÁO",
    },
    {
      id: 2,
      img: "https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_danhmuc_2_child_7_image.png?1683124677097",
      title: "QUẦN",
    },
    {
      id: 3,
      img: "https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_danhmuc_2_child_2_image.png?1683124677097",
      title: "ĐỒ THỂ THAO",
    },
    {
      id: 4,
      img: "https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/home_danhmuc_2_child_12_image.png?1683124677097",
      title: "PHỤ KIỆN",
    },
  ];

  const renderMenuList = (array) => {
    return array.map((item, index) => {
      return (
        <S.ItemPromotion
          key={index}
          className="flex flex-col justify-center align-items-center hover:cursor-pointer "
          onClick={() => {
            navigate({
              pathname: generatePath(ROUTES.USER.PRODUCT_LIST, {
                subCategoryId: item.id,
              }),
            });
          }}
        >
          <S.Img src={item.img}></S.Img>
          <S.Content className="flex justify-center align-items-center">
            {item.title}
          </S.Content>
        </S.ItemPromotion>
      );
    });
  };
  return (
    <div className="sectionMenu w-full order-2">
      <div className="w-full max-w-[1200px] flex flex-wrap items-center justify-center mt-2 mx-auto xxs:p-2 lg:p-0">
        <div className="w-full flex justify-center gap-4">
          <div
            className={`lg:w-[220px] xxs:w-[100px] h-[30px] sm:h-[64px] border-b-2 flex justify-center items-center sm:text-[20px] text-[16px] 
        hover:text-[orange]  hover:cursor-pointer
          ${gender === 1 ? "text-[orange]" : "text-[#97A0AD]"}
        `}
            onClick={() => {
              setGender(1);
            }}
          >
            Nữ
          </div>
          <div
            className={`lg:w-[220px]  xxs:w-[100px] h-[30px] sm:h-[64px] border-b-2 flex justify-center items-center sm:text-[20px] text-[16px] 
       hover:text-[orange] hover:cursor-pointer
          ${gender === 0 ? "text-[orange]" : "text-[#97A0AD]"}
        `}
            onClick={() => {
              setGender(0);
            }}
          >
            Nam
          </div>
        </div>
        <div className="w-full flex justify-center xxs:justify-between md:justify-center md:gap-[50px] mt-4">
          {gender === 1
            ? renderMenuList(menuListFemale)
            : renderMenuList(menuListMale)}
        </div>
      </div>
    </div>
  );
}

export default CarouselMenuSection;
