import * as S from "./styles";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import {
  BsSearch,
  BsGeoAltFill,
  BsCart3,
  BsTelephoneFill,
  BsPersonCircle,
} from "react-icons/bs";
import { useNavigate, generatePath } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const listAoNu = [
    "Áo Polo",
    "Áo Thun",
    "Áo Khoác",
    "Áo Sơ Mi",
    "Áo chống nắng",
  ];
  const listQuanNu = ["Quần Jeans", "Quần Âu", "Quần Kaki", "Quần Short"];
  const listPhuKienNu = ["Giày", "Túi Xách", "Phụ Kiện Khác"];
  const listDoTheThaoNu = [
    "Áo Thun Thể Thao",
    "Áo Polo Thể Thao",
    "Bộ Thể Thao",
  ];
  const listAoNam = ["Áo Polo", "Áo Thun", "Áo Khoác", "Áo Sơ Mi", "Áo Len"];
  const listQuanNam = ["Quần Jeans", "Quần Âu", "Quần Kaki", "Quần Short"];
  const listPhuKienNam = ["Thắt Lưng", "Giày", "Phụ Kiện Khác"];
  const listDoTheThaoNam = [
    "Áo Thun Thể Thao",
    "Áo Polo Thể Thao",
    "Bộ Thể Thao",
    "Quần Thể Thao",
  ];

  return (
    <S.Header>
      <S.HeaderContainer>
        <S.HeaderTop className="w-full flex justify-between items-center ">
          <Link
            to={ROUTES.USER.HOME}
            className="logo"
            style={{ cursor: "pointer" }}
          >
            <img src="//bizweb.dktcdn.net/100/438/408/themes/899432/assets/logo.svg?1678786925300"></img>
          </Link>
          <S.InputCover className="w-1/3 ml-4">
            <S.Input type="text" className="w-4/5" />
            <S.SearchBtn className=" w-1/5 hover:bg-[#f8b021]">
              <BsSearch className="text-[24px]" />
            </S.SearchBtn>
          </S.InputCover>
          <div className="flex justify-around items-center gap-2 ">
            <a
              href=""
              className="flex justify-around items-center text-center gap-1 text-[#11006F] hover:text-[#FCAF17]"
            >
              <BsGeoAltFill className=" text-[#11006F]" />
              <span className="text-[16px] h-30  flex justify-around items-center">
                Tìm
              </span>
              <span className="text-[#11006F] text-[19px] h-30px flex justify-around items-center">
                230+
              </span>
              <span>Cửa hàng </span>
            </a>
            <a href="" className="flex justify-around items-center">
              <BsTelephoneFill className="mr-1 text-[#11006F]" /> 18002086
            </a>
            <span className="rounded-full bg-[#FCAF17] px-2 ">Free</span>
            <span className="">-</span>
            <span className="text-[#11006F]  flex justify-around items-center">
              Đặt hàng gọi
            </span>
            <a
              href=""
              className="flex justify-around items-center ml-4 text-[#11006F]"
            >
              <BsTelephoneFill /> 02499986999
            </a>
          </div>
        </S.HeaderTop>
        <S.HeaderBottom className="flex justify-center items-center w-full">
          <div className="flex justify-start items-center w-3/5">
            <S.Nav className="h-full mb-8">
              <S.ItemNav className="h-full mb-2">
                <S.ItemTitle
                  href=""
                  className="h-80 mx-8 text-[#11006F] flex flex-wrap flex-col items-center  "
                >
                  Nữ
                </S.ItemTitle>
                {/* <S.ChildNavList>
                  <S.ChildNav>
                    <a href="">Áo Nữ</a>
                  </S.ChildNav>
                  <S.ChildNav>
                    <a href="">Quần Nữ</a>
                  </S.ChildNav>
                  <S.ChildNav>
                    <a href="">Váy Nữ</a>
                  </S.ChildNav>
                  <S.ChildNav>
                    <a href="">Đầm Nữ</a>
                  </S.ChildNav>
                </S.ChildNavList> */}
              </S.ItemNav>
              <S.ItemNav className="h-full mb-2">
                <S.ItemTitle
                  href=""
                  className="h-80 mx-8 text-[#11006F] flex flex-wrap flex-col items-center  "
                >
                  Nam
                </S.ItemTitle>
                {/* <S.ChildNavList>
                  <S.ChildNav>
                    <a href="">Áo Nam</a>
                  </S.ChildNav>
                  <S.ChildNav>
                    <a href="">Quần Nam</a>
                  </S.ChildNav>
                  <S.ChildNav>
                    <a href="">Áo Khoác Nam</a>
                  </S.ChildNav>
                  <S.ChildNav>
                    <a href="">Giày Nam</a>
                  </S.ChildNav>
                </S.ChildNavList> */}
              </S.ItemNav>
              <S.ItemNav className="h-full mb-2">
                <S.ItemTitle
                  href=""
                  className="h-80 mx-8 text-[#11006F] flex flex-wrap flex-col items-center  "
                >
                  Trẻ Em
                  <S.ItemBottom className="w-[140%] h-10  rounded-t-lg  "></S.ItemBottom>
                </S.ItemTitle>
                {/* <S.ChildNavList>
                  <S.ChildNav
                    onClick={() =>
                      navigate({
                        pathname: generatePath(ROUTES.ADMIN.TODO_DETAIL, {
                          subcategoryid: 5,
                        }),
                      })
                    }
                  >
                    <a href="">Áo</a>
                  </S.ChildNav>
                  <S.ChildNav>
                    <a href="">Quần</a>
                  </S.ChildNav>
                  <S.ChildNav>
                    <a href="">Áo ấm</a>
                  </S.ChildNav>
                  <S.ChildNav>
                    <a href="">Giày</a>
                  </S.ChildNav>
                </S.ChildNavList> */}
              </S.ItemNav>
            </S.Nav>
          </div>
          <div className="text-[10px] flex justify-end items-center w-2/4">
            <S.Cart className="mr-2">
              <BsCart3 className="text-[24px]" />
            </S.Cart>
            <span className="mr-10 text-[18px]">Giỏ Hàng</span>
            <S.Person className="mr-2">
              <BsPersonCircle className="text-[24px]" />
            </S.Person>
            <a href="" className="">
              Đăng nhập
            </a>
            <span className="m-2">/</span>
            <a href="">Đăng Ký</a>
          </div>
        </S.HeaderBottom>
      </S.HeaderContainer>
    </S.Header>
  );
}
export default Header;
