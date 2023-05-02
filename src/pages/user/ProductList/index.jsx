import { Checkbox, Select, Col, Row, Button, Slider, Form } from "antd";
import { useEffect, useState, useMemo } from "react";
import { Link, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_LIMIT } from "../../../constants/paging";
import LazyLoad from "react-lazy-load";
import axios from "axios";
import { AiOutlineClose, AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import { useParams } from "react-router-dom";
import {
  getProductListAction,
  getCategoryListAction,
  getSizeListAction,
} from "../../../redux/actions";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";
import { useCallback } from "react";
import { debounce } from "lodash";
import { ROUTES } from "../../../constants/routes";
import CartProductList from "./cartProductList";
import { useNavigate } from "react-router-dom";
function ProductList() {
  const navigate = useNavigate();
  const { subCategoryId } = useParams();
  let subCategoryIdArray = subCategoryId.split(",");
  const [gender, setGender] = useState([subCategoryIdArray[0]]);
  const [subCategory, setSubCategory] = useState([]);
  const [listYourChoice, setlistYourChoice] = useState([]);
  const [placeHolderSort, setPlaceHolderSort] = useState("Mặc định");
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [showSizeFilter, setShowSizeFilter] = useState(false);
  const [sortBox, setSortBox] = useState(false);

  const [defaultValuePrice, setDefaultValuePrice] = useState([0, 700]);
  const [active, setActive] = useState(false);
  const [activeButton, setActiveButton] = useState(1);
  const { productList } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);

  const dispatch = useDispatch();
  const [sizeList, setSizeList] = useState([]);
  const [filterParams, setFilterParams] = useState({
    categoryId: [],
    sizeId: [],
    subCategoryId: gender,
    page: 1,
    limit: PRODUCT_LIMIT,
  });
  useEffect(() => {
    axios
      .get("http://localhost:4000/sizes")
      .then((res) => {
        setSizeList(res.data);
      })
      .catch((err) => {
        console.log("loi roi");
      });
  }, []);

  console.log("🚀 ~ file: index.jsx:35 ~ ProductList ~ sizeList:", sizeList);
  useEffect(() => {
    dispatch(
      getCategoryListAction({
        subCategoryId: gender,
      })
    );
    dispatch(getSizeListAction());
  }, [gender]);
  useEffect(() => {
    dispatch(getProductListAction(filterParams));
  }, [filterParams]);
  let categoryIdTemp = [...filterParams.categoryId];
  let sizeIdTemp = [...filterParams.sizeId];
  let clone = [...listYourChoice];
  const removeYourChoice = (array, values, name) => {
    let indexGetAPI = array.indexOf(values);
    array.splice(indexGetAPI, 1);
    let nameOfIndex = clone.findIndex((item) => item.name === name);
    clone.splice(nameOfIndex, 1);
  };

  const checkAddYourChoiceType = (name, name2, valuesId) => {
    let typeId = categoryIdTemp.find((type) => type === valuesId);
    const addYourChoice = (name) => {
      clone.push({ name: name, value: valuesId });
      setlistYourChoice(clone);
    };
    const handleFilterType = (values) => {
      categoryIdTemp = [...filterParams.categoryId, values];
      setFilterParams({
        ...filterParams,
        categoryId: categoryIdTemp,
      });
    };
    if (!typeId) {
      addYourChoice(name);
      handleFilterType(valuesId);
      setActive(true);
    } else {
      setActive(false);
      removeYourChoice(categoryIdTemp, typeId, name);
      setFilterParams({
        ...filterParams,
        categoryId: categoryIdTemp,
        page: 1,
        limit: PRODUCT_LIMIT,
      });
      setlistYourChoice(clone);
    }
  };
  const checkAddYourChoiceSize = (name, name2, valuesId) => {
    let sizeId = sizeIdTemp.find((size) => size === valuesId);
    const addYourChoice = (name) => {
      clone.push({ name: name, value: valuesId });
      setlistYourChoice(clone);
    };
    const handleFilterSize = (values) => {
      sizeIdTemp = [...filterParams.sizeId, values];
      setFilterParams({
        ...filterParams,
        sizeId: sizeIdTemp,
        page: 1,
        limit: PRODUCT_LIMIT,
      });
    };
    if (!sizeId) {
      addYourChoice(name);
      handleFilterSize(valuesId);
    } else {
      removeYourChoice(sizeIdTemp, sizeId, name);
      setFilterParams({
        ...filterParams,
        sizeId: sizeIdTemp,
      });
      setlistYourChoice(clone);
    }
  };
  useEffect(() => {
    setlistYourChoice(clone);
  }, []);
  const removeYourChoiceTop = (objectname) => {
    let valueType = categoryIdTemp.map((item) => {
      if (item === objectname.value) {
        removeYourChoice(categoryIdTemp, item, objectname.name);
        setlistYourChoice(clone);
        setFilterParams({
          ...filterParams,
          categoryId: categoryIdTemp,
          page: 1,
          limit: PRODUCT_LIMIT,
        });
      }
    });
    let valueSize = sizeIdTemp.map((item) => {
      if (item === objectname.value) {
        removeYourChoice(sizeIdTemp, item, objectname.name);
        setlistYourChoice(clone);
        setFilterParams({
          ...filterParams,
          sizeId: sizeIdTemp,
          page: 1,
          limit: PRODUCT_LIMIT,
        });
      }
    });
  };
  let genderClone = [];
  const removeAll = () => {
    clone = [];
    setlistYourChoice(clone);
    categoryIdTemp = [];
    sizeIdTemp = [];
    setFilterParams({
      ...filterParams,
      categoryId: categoryIdTemp,
      sizeId: sizeIdTemp,
      page: 1,
      limit: PRODUCT_LIMIT,
      subCategoryId: genderClone,
    });
  };
  const renderListFilterType = (list) => {
    return (
      <div className="w-full flex flex-wrap gap-2 duration-700 transition-[height] ">
        {list?.map((item, index) => {
          return (
            <div
              key={item.id}
              className={`px-[16px] py-2 mt-2 relative bg-[#f7f4f4] hover:cursor-pointer rounded-md ${
                categoryIdTemp.findIndex((a) => item.id === a) === -1
                  ? "bg-[#fcfcfc]"
                  : "border-solid border-2 border-[#fcaf17] after:h-[22px] after:rounded-tr-md after:w-[22px] after:content-[''] after:top-[-1px] after:right-[-1px] after:absolute after:bg-[url('https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/chose.svg')]"
              } `}
              onClick={(e) => {
                checkAddYourChoiceType(item.name, "catalogyId", item.id);
              }}
              id={item.id}
            >
              {item.name}, {item.id}
            </div>
          );
        })}
      </div>
    );
  };

  const renderListFilterSize = (list) => {
    return (
      <div className="w-full flex flex-wrap gap-2 ">
        {list?.map((item, index) => {
          return (
            <div
              key={item.id}
              className={`px-[16px] py-2 mt-2 relative bg-[#f7f4f4] hover:cursor-pointer rounded-md  ${
                sizeIdTemp.findIndex((a) => item.id === a) === -1
                  ? "bg-[#fcfcfc]"
                  : "border-solid border-2 border-[#fcaf17] after:h-[22px] after:rounded-tr-md after:w-[22px] after:content-[''] after:top-[-1px] after:right-[-1px] after:absolute after:bg-[url('https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/chose.svg')]"
              } `}
              onClick={() =>
                checkAddYourChoiceSize(item.size, "sizeId", item.id)
              }
            >
              {item.size}, {item.id}
            </div>
          );
        })}
      </div>
    );
  };
  const handleFilter = (key, values) => {
    let sortClone = values;
    setFilterParams({
      ...filterParams,
      sort: sortClone,
      page: 1,
      limit: PRODUCT_LIMIT,
    });
  };

  const renderListFilterPrice = (list) => {
    return (
      <div className="w-[90%] ">
        <Slider
          onAfterChange={(value) => {
            setDefaultValuePrice(value);
            setFilterParams({
              ...filterParams,
              price_gte: value[0],
              price_lte: value[1],
              page: 1,
              limit: PRODUCT_LIMIT,
            });
          }}
          min={0}
          max={700}
          range={{
            draggableTrack: false,
          }}
          defaultValue={defaultValuePrice}
        />
      </div>
    );
  };

  const RenderYourChoice = useMemo(() => {
    return (
      <div className="w-full flex flex-wrap gap-2 ">
        {listYourChoice?.map((item, index) => {
          return (
            <div
              key={index}
              className=" flex items-center gap-2 px-2 py-[2px] rounded-md text-[white] bg-[orange] mt-2 hover:cursor-pointer"
              onClick={() => {
                removeYourChoiceTop(item);
              }}
            >
              <AiOutlineClose className="text-[20px] ml-[-4px]" />
              {item.name}
            </div>
          );
        })}
      </div>
    );
  }, [listYourChoice]);

  const CpnFilter = ({ listYourChoice, typeProduct, sizeProduct }) => {
    return (
      <div
        className={`col-span-1 lg:block p-2  ${
          sortBox
            ? "xxs:block fixed right-0 top-0 w-[220px]  bg-[white] z-50 h-full"
            : "xxs:hidden"
        } `}
      >
        <div
          className={`w-full flex justify-start items-center mb-2 ${
            sortBox ? "block" : "hidden"
          } `}
        >
          <AiOutlineClose
            className="w-[20%] flex justify-start text-[20px] hover:cursor-pointer"
            onClick={() => setSortBox(!sortBox)}
          />
          <p className="w-[80%] flex justify-center text-[20px] text-[orange]">
            Bộ Lọc
          </p>
        </div>
        <div className="flex justify-between">
          Bạn chọn:
          <div
            className="hover:text-[orange] cursor-pointer"
            onClick={() => removeAll()}
          >
            Bỏ hết
          </div>
        </div>
        {RenderYourChoice}
        <div className="my-4">Giá</div>
        {renderListFilterPrice()}
        <div
          className="my-4 flex justify-between items-center"
          onClick={() => {
            setShowTypeFilter(!showTypeFilter);
          }}
        >
          Loại sản phẩm {sortBox && showTypeFilter && <AiOutlineUp />}{" "}
          {sortBox && !showTypeFilter && <AiOutlineDown />}
        </div>
        <div className="transition-[height]">
          {sortBox
            ? showTypeFilter && renderListFilterType(typeProduct)
            : renderListFilterType(typeProduct)}
        </div>
        <div
          className="my-4 flex justify-between items-center"
          onClick={() => {
            setShowSizeFilter(!showSizeFilter);
          }}
        >
          Size {sortBox && showSizeFilter && <AiOutlineUp />}
          {sortBox && !showSizeFilter && <AiOutlineDown />}
        </div>
        <div>
          {sortBox
            ? showSizeFilter && renderListFilterSize(sizeProduct)
            : renderListFilterSize(sizeProduct)}
        </div>
      </div>
    );
  };
  const renderPlaceHolderSort = (value) => {
    if (value === "") setPlaceHolderSort("Mặc định");
    else if (value === "title.desc") setPlaceHolderSort("Tên A-Z");
    else if (value === "title.asc") setPlaceHolderSort("Tên Z-A");
    else if (value === "price.asc") setPlaceHolderSort("Giá tăng dần");
    else if (value === "price.desc") setPlaceHolderSort("Giá giảm dần");
  };
  const CpnFilterSort = () => {
    return (
      <div className="mb-4 lg:w-full flex justify-end gap-2">
        <div className="flex items-center">Sắp xếp:</div>
        <div className="w-[120px]">
          <Col>
            <Select
              onChange={(value) => {
                handleFilter("sort", value);
                renderPlaceHolderSort(value);
              }}
              placeholder={placeHolderSort}
              style={{ width: "100%" }}
            >
              <Select.Option value="">Mặc định</Select.Option>
              <Select.Option value="title.desc">Tên A-Z</Select.Option>
              <Select.Option value="title.asc">Tên Z-A</Select.Option>
              <Select.Option value="price.asc">Giá tăng dần</Select.Option>
              <Select.Option value="price.desc">Giá giảm dần</Select.Option>
            </Select>
          </Col>
        </div>
      </div>
    );
  };
  let activeButtonClone = 0;
  useEffect(() => {
    setActiveButton(activeButton);
  }, [activeButton]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/subCategories/${parseInt(subCategoryIdArray[0])}`
      )
      .then((res) => {
        setSubCategory(res.data);
      })

      .catch((err) => {});
  }, []);
  return (
    <div className="w-full p-[8px] flex flex-nowrap flex-col justify-between">
      <div className="w-full flex justify-center">
        {subCategoryIdArray.length > 1 ? (
          <>
            {" "}
            <p
              className="cursor-pointer hover:text-[orange]"
              onClick={() => {
                navigate({
                  pathname: generatePath(ROUTES.USER.HOME),
                });
              }}
            >
              Trang chủ /
            </p>
            {activeButton ? "Nữ" : "Nam"}
          </>
        ) : (
          <>
            {" "}
            <p
              className="cursor-pointer hover:text-[orange]"
              onClick={() => {
                navigate({
                  pathname: generatePath(ROUTES.USER.HOME),
                });
              }}
            >
              Trang chủ /
            </p>
            {subCategory.name}
          </>
        )}
      </div>

      {subCategoryIdArray.length > 1 ? (
        <>
          <div className="w-full flex justify-center mb-[10px] text-[#fcaf17] text-[20px]">
            {parseInt(subCategoryIdArray[0]) === 5 && <p>ÁO</p>}
            {parseInt(subCategoryIdArray[0]) === 6 && <p>QUẦN</p>}
            {parseInt(subCategoryIdArray[0]) === 8 && <p>ĐỒ THỂ THAO</p>}
            {parseInt(subCategoryIdArray[0]) === 4 && <p>PHỤ KIỆN</p>}
            {parseInt(subCategoryIdArray[0]) === 7 && <p>VÁY</p>}
          </div>
          <div className="w-full flex justify-center h-[80px] mb-[10px] p-[20px] bg-[#F8F8F8] gap-3">
            <button
              onClick={() => {
                setGender(parseInt(subCategoryIdArray[0]));
                genderClone = parseInt(subCategoryIdArray[0]);
                setFilterParams({
                  ...filterParams,
                  subCategoryId: genderClone,
                });
                removeAll();
                activeButtonClone = 1;
                setActiveButton(activeButtonClone);
              }}
              className={`p-2 w-[80px] rounded-md hover:bg-[#fcaf17] ${
                activeButton ? "bg-[#fcaf17]" : "bg-[#ffff]"
              } `}
            >
              Nữ
            </button>
            <button
              onClick={() => {
                setGender(parseInt(subCategoryIdArray[1]));
                genderClone = parseInt(subCategoryIdArray[1]);

                setFilterParams({
                  ...filterParams,
                  subCategoryId: genderClone,
                });

                removeAll();
                activeButtonClone = 0;
                setActiveButton(activeButtonClone);
              }}
              className={`p-2 w-[80px] rounded-md hover:bg-[#fcaf17] ${
                activeButton ? "bg-[#ffff]" : "bg-[#fcaf17]"
              } `}
            >
              Nam
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="flex justify-between min-w-[250px]">
        <CpnFilterSort></CpnFilterSort>
        <div
          className="xs:block lg:hidden cursor-pointer"
          onClick={() => {
            setSortBox(!sortBox);
            console.log("dmdmdmmd");
          }}
        >
          <p className="flex items-centers sm:gap-2 xs:gap-0">
            Bộ lọc <FiFilter className="text-[20px]" />
          </p>
        </div>
      </div>

      <div className="xl:w-[1150px] lg:w-[900px] grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-4 justify-center ">
        <CpnFilter
          listYourChoice={listYourChoice}
          typeProduct={categoryList.data}
          sizeProduct={sizeList}
        />
        <CartProductList
          listProduct={productList.data}
          filterParams={filterParams}
        ></CartProductList>
      </div>
    </div>
  );
}

export default ProductList;
