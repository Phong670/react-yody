import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProductListSearchAction } from "../../redux/actions";
import { useMemo } from "react";
import { Link, generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useState } from "react";

const SearchBox = ({ searchKey, setSearchKey, setOpenSearchBox }) => {
  const [goSearchPage, setGoSearchPage] = useState(false);
  const { productSearchList } = useSelector((state) => state.productSearch);
  console.log(
    "🚀 ~ file: searchBox.jsx:13 ~ SearchBox ~ productSearchList:",
    productSearchList
  );
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

  const renderListProductSearch = useMemo(() => {
    return productSearchList.data?.map((item, index) => {
      return (
        <Link
          key={index}
          className=" h-[80px] w-full flex justify-start cursor-pointer mb-2  gap-1 z-10 p-1 "
          to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}
          onClick={() => setGoSearchPage(true)}
        >
          <img className="object-cover h-full" src={item.image} alt="" />
          <div>
            <div className="  hover:text-[orange] ">{item.title}</div>
            <div className=" ">{item.price.toLocaleString()}đ</div>
          </div>
        </Link>
      );
    });
  }, [productSearchList.data]);

  return (
    <>
      {searchKey &&
        !goSearchPage &&
        (productSearchList.data.length > 0 ? (
          <div className="flex flex-wrap justify-start">
            {renderListProductSearch}
            <div
              className=" w-full h-10 cursor-pointer flex items-center justify-center bg-[orange]"
              onClick={() => {
                navigate({
                  pathname: generatePath(ROUTES.USER.SEARCH, {
                    searchKey: searchKey,
                  }),
                });
                setSearchKey(false);
                setGoSearchPage(true);
                setOpenSearchBox(false);
              }}
            >
              Xem thêm kết quả
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            Không có kết quả tìm kiếm
          </div>
        ))}
    </>
  );
};
export default SearchBox;
