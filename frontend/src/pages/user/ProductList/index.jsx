import * as S from "./styles";

import { useEffect, useState, useMemo, useRef } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PRODUCT_LIMIT } from "../../../constants/paging";
import { ROUTES } from "../../../constants/routes";
import CartProductList from "./cartProductList";
import {
  getProductListAction,
  getCategoryListAction,
  getSizeListAction,
} from "../../../redux/actions";
import axios from "axios";

import { AiOutlineClose, AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { Select, Col, Button, Slider, Drawer, Space, Input } from "antd";
import { FiFilter } from "react-icons/fi";

let genderClone = null;
let valuePriceClone = [0, 1200000];

function ProductList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { subCategoryId } = useParams();
  let subCategoryIdArray = subCategoryId.split(",");

  let [gender, setGender] = useState([subCategoryIdArray[0]]);
  const [subCategory, setSubCategory] = useState([]);
  const [listYourChoice, setListYourChoice] = useState([]);
  const [placeHolderSort, setPlaceHolderSort] = useState("Mặc định");
  const [defaultValuePrice, setDefaultValuePrice] = useState([0, 1200000]);
  const [activeButton, setActiveButton] = useState(1);
  const { productList } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);
  const [sizeList, setSizeList] = useState([]);
  const [stickySort, setStickySort] = useState(false);
  const [open, setOpen] = useState(false);
  const [filterParams, setFilterParams] = useState({
    categoryId: [],
    sizeId: [],
    page: 1,
    limit: PRODUCT_LIMIT,
    subCategoryId: gender,
  });

  useEffect(() => {
    setGender(subCategoryIdArray[0]);
  }, [subCategoryId]);

  useEffect(() => {
    setFilterParams({
      ...filterParams,
      subCategoryId: gender,
    });
  }, [gender]);

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
  }, [filterParams, subCategoryId, gender]);
  useEffect(() => {
    setListYourChoice(clone);
  }, []);
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
  }, [gender]);
  //clone value
  let categoryIdTemp = [...filterParams.categoryId];
  let sizeIdTemp = [...filterParams.sizeId];
  let clone = [...listYourChoice];

  let activeButtonClone = 0;
  //ant function
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  //function
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
      setListYourChoice(clone);
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
    } else {
      removeYourChoice(categoryIdTemp, typeId, name);
      setFilterParams({
        ...filterParams,
        categoryId: categoryIdTemp,
        page: 1,
        limit: PRODUCT_LIMIT,
      });
      setListYourChoice(clone);
    }
  };
  const checkAddYourChoiceSize = (name, name2, valuesId) => {
    let sizeId = sizeIdTemp.find((size) => size === valuesId);
    const addYourChoice = (name) => {
      clone.push({ name: name, value: valuesId });
      setListYourChoice(clone);
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
      setListYourChoice(clone);
    }
  };

  const removeYourChoiceTop = (objectname) => {
    categoryIdTemp.map((item) => {
      if (item === objectname.value) {
        removeYourChoice(categoryIdTemp, item, objectname.name);
        setListYourChoice(clone);
        setFilterParams({
          ...filterParams,
          categoryId: categoryIdTemp,
          page: 1,
          limit: PRODUCT_LIMIT,
        });
      }
    });
    sizeIdTemp.map((item) => {
      if (item === objectname.value) {
        removeYourChoice(sizeIdTemp, item, objectname.name);
        setListYourChoice(clone);
        setFilterParams({
          ...filterParams,
          sizeId: sizeIdTemp,
          page: 1,
          limit: PRODUCT_LIMIT,
        });
      }
    });
  };

  const removeAll = (subCategoryIdRemove) => {
    clone = [];
    genderClone = subCategoryIdRemove;
    setListYourChoice(clone);
    valuePriceClone = [0, 1200000];
    setDefaultValuePrice([0, 1200000]);
    categoryIdTemp = [];
    sizeIdTemp = [];
    setFilterParams({
      ...filterParams,
      categoryId: categoryIdTemp,
      sizeId: sizeIdTemp,
      page: 1,
      limit: PRODUCT_LIMIT,
      subCategoryId: subCategoryIdRemove,
      price_gte: valuePriceClone[0],
      price_lte: valuePriceClone[1],
    });
  };
  const renderListFilterType = useMemo(() => {
    return (
      <div className={`w-full flex flex-wrap gap-2  overflow-hidden `}>
        {categoryList.data?.map((item, index) => {
          return (
            <div
              key={item.id}
              className={`px-[10px] text-[12px] py-[8px] mt-2 relative border-[1px] border-[#F2F2F2]
              hover:cursor-pointer  hover:bg-[white] hover:border-[1px] hover:border-[#fcaf17] 
              rounded-md text-[#7A7A9D] ${
                categoryIdTemp.findIndex((a) => item.id === a) === -1
                  ? " bg-[#F2F2F2]"
                  : " bg-[white] border-solid border-[1px]  border-[#fcaf17]  after:h-[22px] after:rounded-tr-md after:w-[22px] after:content-[''] after:top-[-1px] after:right-[-1px] after:absolute after:bg-[url('https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/chose.svg')]"
              } `}
              onClick={(e) => {
                checkAddYourChoiceType(item.name, "catalogyId", item.id);
              }}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    );
  }, [categoryList.data, categoryIdTemp]);

  const renderListFilterSize = (list) => {
    return (
      <div className="w-full flex flex-wrap gap-2 ">
        {list?.map((item) => {
          return (
            <div
              key={item.id}
              className={`px-[10px] text-[12px] py-[8px] mt-2 relative border-[1px] border-[#F2F2F2]
              hover:cursor-pointer  hover:bg-[white] hover:border-[1px] hover:border-[#fcaf17] 
              rounded-md text-[#7A7A9D] ${
                sizeIdTemp.findIndex((a) => item.id === a) === -1
                  ? " bg-[#F2F2F2]"
                  : " bg-[white] border-solid border-[1px]  border-[#fcaf17]  after:h-[22px] after:rounded-tr-md after:w-[22px] after:content-[''] after:top-[-1px] after:right-[-1px] after:absolute after:bg-[url('https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/chose.svg')]"
              } `}
              onClick={() =>
                checkAddYourChoiceSize(item.size, "sizeId", item.id)
              }
            >
              {item.size}
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

  const renderListFilterPrice = useMemo(
    (list) => {
      return (
        <div className="w-[90%] ">
          <div className="w-100% flex justify-between gap-2">
            <Input
              className={`${valuePriceClone[0] !== 0 ? "!bg-[orange]" : ""}`}
              value={valuePriceClone[0].toLocaleString()}
              disabled
            ></Input>
            <Input
              className={`${
                valuePriceClone[1] !== 1200000 ? "!bg-[orange]" : ""
              }`}
              value={valuePriceClone[1].toLocaleString()}
              disabled
            ></Input>
          </div>

          <Slider
            step={10000}
            onAfterChange={(value) => {
              setDefaultValuePrice(value);

              valuePriceClone = value;

              setFilterParams({
                ...filterParams,
                price_gte: value[0],
                price_lte: value[1],
                page: 1,
                limit: PRODUCT_LIMIT,
              });
            }}
            min={0}
            max={1200000}
            range={{
              draggableTrack: false,
            }}
            // value={[filterParams.price_gte, filterParams.price_lte]}
            defaultValue={defaultValuePrice}
          />
        </div>
      );
    },
    [valuePriceClone]
  );

  const RenderYourChoice = useMemo(() => {
    return (
      <div className="w-full flex flex-wrap gap-2 ">
        {listYourChoice?.map((item, index) => {
          return (
            <div
              key={index}
              className=" flex   text-[12px] items-center gap-1 px-2 py-[2px] rounded-md text-[white] bg-[orange] mt-2 hover:cursor-pointer"
              onClick={() => {
                removeYourChoiceTop(item);
              }}
            >
              <AiOutlineClose className="text-[16px] ml-[-4px]" />
              {item.name}
            </div>
          );
        })}
      </div>
    );
  }, [listYourChoice]);

  const renderPlaceHolderSort = (value) => {
    if (value === "") setPlaceHolderSort("Mặc định");
    else if (value === "title.desc") setPlaceHolderSort("Tên A-Z");
    else if (value === "title.asc") setPlaceHolderSort("Tên Z-A");
    else if (value === "price.asc") setPlaceHolderSort("Giá tăng dần");
    else if (value === "price.desc") setPlaceHolderSort("Giá giảm dần");
  };
  const CpnFilterSort = () => {
    return (
      <div className={` lg:w-full flex justify-end gap-2 `}>
        <div className="flex items-center">Sắp xếp:</div>
        <div className="min-w-[120px]">
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

  const CpnFilter = ({ listYourChoice, typeProduct, sizeProduct }) => {
    const [showSizeFilter, setShowSizeFilter] = useState(true);
    const [showTypeFilter, setShowTypeFilter] = useState(true);

    return (
      <div className="lg:col-span-1 xxs:col-span-0 p-2">
        <div className="flex justify-between">
          Bạn chọn:
          <div
            className="hover:text-[orange] cursor-pointer"
            onClick={() => removeAll(gender)}
          >
            Bỏ hết
          </div>
        </div>
        {RenderYourChoice}
        <div className="mt-4 mb-8">Giá</div>
        {renderListFilterPrice}

        <div
          className="w-full flex justify-between my-2"
          onClick={() => {
            setShowTypeFilter(!showTypeFilter);
          }}
        >
          Loại sản phẩm
          {showTypeFilter && <AiOutlineUp />}
          {!showTypeFilter && <AiOutlineDown />}
        </div>
        <div className="overflow-hidden">
          <div
            className={`overflow-hidden transition-all duration-300 delay-150 
            ${showTypeFilter ? "mt-0" : "mt-[-140%]"}`}
          >
            <div className="w-full">{renderListFilterType}</div>
          </div>
        </div>
        <div
          className="w-full flex justify-between my-2"
          onClick={() => {
            setShowSizeFilter(!showSizeFilter);
          }}
        >
          Size
          {showSizeFilter && <AiOutlineUp />}
          {!showSizeFilter && <AiOutlineDown />}
        </div>
        <div className="overflow-hidden">
          <div
            className={`overflow-hidden transition-all duration-300 delay-150 
             ${showSizeFilter ? "mt-0" : "mt-[-140%]"}`}
          >
            <div className="w-full">{renderListFilterSize(sizeList)}</div>
          </div>
        </div>
      </div>
    );
  };
  window.onscroll = function () {
    myFunction();
  };
  // scroll fixed "sortBar"
  var sticky = 139;

  function myFunction() {
    if (window.pageYOffset > sticky) {
      setStickySort(true);
    } else {
      setStickySort(false);
    }
  }
  return (
    <div className=" max-w-[1200px] p-[8px] flex flex-nowrap flex-col justify-between lg:mt-[55px] xxs:mt-[30px]">
      <div className="w-full relative flex justify-center mb-4">
        {subCategoryIdArray.length > 1 ? (
          <>
            <p
              className="cursor-pointer hover:text-[orange] text-[20px]"
              onClick={() => {
                navigate({
                  pathname: generatePath(ROUTES.USER.HOME),
                });
              }}
            >
              Trang chủ /
            </p>
            <p className="text-[20px] ml-2">{activeButton ? "Nữ" : "Nam"}</p>
          </>
        ) : (
          <>
            <p
              className="cursor-pointer hover:text-[orange] text-[20px]"
              onClick={() => {
                navigate({
                  pathname: generatePath(ROUTES.USER.HOME),
                });
              }}
            >
              Trang chủ /
            </p>
            <p className="text-[20px]  ml-2">{subCategory.name}</p>
          </>
        )}
      </div>

      {subCategoryIdArray.length > 1 ? (
        <>
          <div className="w-full flex justify-center mb-[10px] text-[#fcaf17] text-[20px]">
            {parseInt(subCategoryIdArray[0]) === 5 && <p>ÁO</p>}
            {parseInt(subCategoryIdArray[0]) === 6 && <p>QUẦN</p>}
            {parseInt(subCategoryIdArray[0]) === 8 && <p>VÁY</p>}
            {parseInt(subCategoryIdArray[0]) === 4 && <p>PHỤ KIỆN</p>}
            {parseInt(subCategoryIdArray[0]) === 7 && <p>ĐỒ THỂ THAO</p>}
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
                removeAll(genderClone);
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

                removeAll(genderClone);
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
      <div
        className={`flex lg:relative lg:z-0 h-[42px] overflow-hidden xxs:w-full items-center justify-between min-w-[250px] 
       border-solid border-b-2 border-[#dde1ef]
      ${
        stickySort
          ? "xxs:fixed top-[53px] right-0 xxs:bg-[white] xxs:z-[999] xxs:px-[8px]"
          : ""
      }
      `}
      >
        <CpnFilterSort></CpnFilterSort>
        <div
          className="xs:block lg:hidden cursor-pointer "
          onClick={() => {
            showDrawer();
          }}
        >
          <p className="flex  sm:gap-2 xs:gap-0 text-center h-[32px] !items-center">
            Bộ lọc <FiFilter className="text-[20px]" />
          </p>
        </div>
      </div>

      <div className="xl:w-[1150px]  w-full grid lg:grid-cols-5 md:grid-cols-5 lg:gap-[20px] xxs:gap-[10px]">
        <div className="xxs:hidden lg:block">
          {" "}
          <CpnFilter
            listYourChoice={listYourChoice}
            typeProduct={categoryList.data}
            sizeProduct={sizeList}
          />
        </div>
        <Drawer
          width={"300px"}
          title="Bộ lọc"
          placement="right"
          onClose={onClose}
          open={open}
          extra={
            <Space>
              <Button
                className="bg-[orange] hover:!bg-[#FEECC7] hover:!text-[orange]"
                type="primary"
                onClick={onClose}
              >
                OK
              </Button>
            </Space>
          }
        >
          <CpnFilter
            listYourChoice={listYourChoice}
            typeProduct={categoryList.data}
            sizeProduct={sizeList}
          />
        </Drawer>
        <CartProductList
          listProduct={productList.data}
          filterParams={filterParams}
        ></CartProductList>
      </div>
    </div>
  );
}

export default ProductList;
