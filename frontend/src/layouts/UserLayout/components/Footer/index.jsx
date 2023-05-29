import * as S from "./styles";
import { BsGeoAltFill, BsShop, BsTelephoneFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

import { useState } from "react";
function Footer() {
  const listSocial = [
    <S.ItemSocialLink>
      <img
        src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/social_1.png?1682069657430"
        alt=""
      />
    </S.ItemSocialLink>,
    <S.ItemSocialLink>
      <img
        src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/social_3.png?1682069657430"
        alt=""
      />
    </S.ItemSocialLink>,
    <S.ItemSocialLink>
      <img
        src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/social_4.png?1682069657430"
        alt=""
      />
    </S.ItemSocialLink>,
    <S.ItemSocialLink>
      <img
        src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/social_5.png?1682069657430"
        alt=""
      />
    </S.ItemSocialLink>,
    <S.ItemSocialLink>
      <img
        src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/social_7.png?1682069657430"
        alt=""
      />
    </S.ItemSocialLink>,

    <S.ItemSocialLink>
      <img
        src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/social_6.png?1682069657430"
        alt=""
      />
    </S.ItemSocialLink>,
  ];

  const listFollowYody = [
    "Giới thiệu",
    "Liên hệ",
    "Tuyển dụng",
    "Tin tức",
    "Hệ thống cửa hàng",
  ];

  const listSuportYody = [
    "Hướng dẫn chọn size",
    "Chính sách khách hàng thân thiết",
    "Chính sách đổi/trả",
    "Chính sách bảo mật",
    "Thanh toán, giao nhận",
    "Chính sách Đồng phục",
    "Chính sách bảo mật thông tin khách hàng",
  ];

  const listContactYody = [
    <>
      <S.Icon>
        <BsGeoAltFill />
      </S.Icon>
      Công ty cổ phần Thời trang YODY
    </>,
    "Mã số thuế: 0801206940",
    "Địa chỉ: Đường An Định - Phường Việt Hòa - Thành phố Hải Dương - Hải Dương",
    <>
      <S.Icon>
        <BsShop />
      </S.Icon>
      Tìm cửa hàng gần bạn nhất
    </>,
    <>
      <S.Icon>
        <BsTelephoneFill />
      </S.Icon>
      Liên hệ đặt hàng: 024 999 86 999
    </>,
    "Thắc mắc đơn hàng: 024 999 86 999",
    "Góp ý khiếu nại: 1800 2086",
    <>
      <S.Icon>
        <AiOutlineMail />
      </S.Icon>
      <p style={{ overflow: "hidden" }}>Email: chamsockhachhang@yody.vnd</p>
    </>,
    <>
      <S.Img
        src="https://bizweb.dktcdn.net/100/438/408/themes/899432/assets/logo_bct.png?1678871161796"
        alt=""
      />
      <S.Img
        className="ml-2"
        src="https://images.dmca.com/Badges/_dmca_premi_badge_5.png?ID=d3a2c2c5-a581-451b-b7ff-ff08fee58d6a"
        alt=""
      />
    </>,
  ];

  const HandleRenderListFooter = (array) => {
    return array.map((item, index) => {
      return (
        <S.ItemFooterYody key={index}>
          <S.ItemChildFooter href="">{item}</S.ItemChildFooter>
        </S.ItemFooterYody>
      );
    });
  };
  const [isShowList1, setisShowList1] = useState(false);
  const [isShowList2, setisShowList2] = useState(false);

  const [isShowList3, setisShowList3] = useState(false);

  const showListFooter1 = () => {
    setisShowList1(!isShowList1);
  };
  const showListFooter2 = () => {
    setisShowList2(!isShowList2);
  };
  const showListFooter3 = () => {
    setisShowList3(!isShowList3);
  };
  return (
    <S.Footer>
      <S.FooterWrapper>
        <S.LeftFooter>
          <S.Vision className="text-center">
            “Đặt sự hài lòng của khách hàng là ưu tiên số 1 trong mọi suy nghĩ
            hành động của mình” là sứ mệnh, là triết lý, chiến lược.. luôn cùng
            YODY tiến bước"
          </S.Vision>
          <S.TitleRegister>ĐĂNG KÝ NHẬN THÔNG TIN</S.TitleRegister>
          <S.InputRegister>
            <S.InputEmail placeholder="Nhập Email đăng ký nhận thông tin"></S.InputEmail>
            <S.BtnRegister>Đăng ký</S.BtnRegister>
          </S.InputRegister>
          <S.Social>{HandleRenderListFooter(listSocial)}</S.Social>
        </S.LeftFooter>
        <S.MiddleFooter>
          <S.YodyTitleFooter onClick={() => showListFooter1()}>
            VỀ YODY
            <S.Arrow isShow={isShowList1}>
              {isShowList1 ? <SlArrowUp /> : <SlArrowDown />}
            </S.Arrow>
          </S.YodyTitleFooter>
          <S.ListYodyFollow isShow={isShowList1}>
            {HandleRenderListFooter(listFollowYody)}
          </S.ListYodyFollow>
        </S.MiddleFooter>
        <S.MiddleFooter>
          <S.YodyTitleFooter onClick={() => showListFooter2()}>
            HỖ TRỢ KHÁCH HÀNG{" "}
            <S.Arrow isShow={isShowList2}>
              {isShowList2 ? <SlArrowUp /> : <SlArrowDown />}
            </S.Arrow>
          </S.YodyTitleFooter>
          <S.ListYodyFollow isShow={isShowList2}>
            {HandleRenderListFooter(listSuportYody)}
          </S.ListYodyFollow>
        </S.MiddleFooter>
        <S.RightHeader>
          <S.YodyTitleFooter onClick={() => showListFooter3()}>
            CÔNG TY CP THỜI TRANG YODY
            <S.Arrow isShow={isShowList3}>
              {isShowList3 ? <SlArrowUp /> : <SlArrowDown />}
            </S.Arrow>
          </S.YodyTitleFooter>
          <S.ListYodyFollow isShow={isShowList3}>
            {HandleRenderListFooter(listContactYody)}
          </S.ListYodyFollow>
        </S.RightHeader>
      </S.FooterWrapper>
    </S.Footer>
  );
}
export default Footer;
