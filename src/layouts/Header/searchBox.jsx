import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProductListSearchAction } from "../../redux/actions";
import { useMemo } from "react";
import { Link, generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useState } from "react";

const SearchBox = ({ searchKey }) => {
  const [goSearchPage, setGoSearchPage] = useState(false);
  const { productSearchList } = useSelector((state) => state.productSearch);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("dis");
    dispatch(
      getProductListSearchAction({
        page: 1,
        limit: 5,
        searchKey: searchKey,
      })
    );
    setGoSearchPage(false);
  }, [searchKey]);
  console.log(
    "🚀 ~ file: searchBox.jsx:8 ~ SearchBox ~ productSearchList:",
    productSearchList
  );

  const renderListProductSearch = useMemo(() => {
    return productSearchList.data?.map((item, index) => {
      return (
        <div
          key={index}
          className=" h-[80px] cursor-pointer grid grid-rows-3 grid-flow-col gap-1 z-10 p-1 border-b-2 border-[#e9e9e9]"
        >
          <img
            className="row-span-3 object-cover h-full"
            src={item.image}
            alt=""
          />
          <div className="row-span-2 col-span-2 ">{item.title}</div>
          <div className="col-span-2 ">{item.price.toLocaleString()}đ</div>
        </div>
      );
    });
  }, [productSearchList]);

  return (
    <>
      {searchKey &&
        !goSearchPage &&
        (productSearchList.data.length > 0 ? (
          <>
            {renderListProductSearch}
            <div
              className=" w-full h-10 cursor-pointer flex items-center justify-center hover:bg-[orange]"
              onClick={() => {
                navigate({
                  pathname: generatePath(ROUTES.USER.SEARCH, {
                    searchKey: searchKey,
                  }),
                });
                setGoSearchPage(true);
              }}
            >
              Xem thêm kết quả
            </div>
          </>
        ) : (
          <div>Không có kết quả tìm kiếm</div>
        ))}
    </>
  );
};
export default SearchBox;
