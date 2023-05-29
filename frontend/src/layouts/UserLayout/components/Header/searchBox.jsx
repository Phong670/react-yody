import { Fragment, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { Link, generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const SearchBox = ({
  searchKey,
  openSearchBox,
  setSearchKey,
  setOpenSearchBox,
  empty,
  setEmpty,
}) => {
  const navigate = useNavigate();
  const { productSearchList } = useSelector((state) => state.productSearch);
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 44,
        color: "#ffc107",
      }}
      spin
    />
  );
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  //getWidthScreen
  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  const renderListProductSearch = useMemo(() => {
    return productSearchList.data?.map((item, index) => {
      return (
        <Link
          key={index}
          className=" h-[80px] w-full flex justify-start cursor-pointer mb-2  gap-1 z-10 p-1 "
          to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}
          onClick={() => {
            setEmpty(true);
            setOpenSearchBox(false);
          }}
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

  //outClickBox
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          screenSize.width > 990 && setEmpty(true);
        }
      }
      // Bind the event listener
      document.addEventListener("keypress", function (e) {
        if (e.keyCode !== 13) {
          document.addEventListener("mousedown", handleClickOutside);
        } else {
        }

        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      });
    }, [ref, screenSize.width]);
  }
  const renderResult = useMemo(() => {
    return (
      <>
        {productSearchList.data.length > 0 ? (
          <div className="flex flex-wrap justify-start z-10">
            {renderListProductSearch}
            <div
              className=" w-full h-10 cursor-pointer flex items-center justify-center bg-[orange]"
              onClick={() => {
                navigate({
                  pathname: generatePath(ROUTES.USER.SEARCH, {
                    searchKey: searchKey,
                  }),
                });
                setOpenSearchBox(false);
                setEmpty(true);
                setSearchKey("");
              }}
            >
              Xem thêm kết quả
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            Không có kết quả tìm kiếm
          </div>
        )}
      </>
    );
  }, [productSearchList.data]);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  return (
    <>
      {empty ? (
        <></>
      ) : productSearchList.load ? (
        <Spin className="p-4" indicator={antIcon} />
      ) : (
        <div className="w-full" ref={wrapperRef}>
          {renderResult}
        </div>
      )}
    </>
  );
};
export default SearchBox;
