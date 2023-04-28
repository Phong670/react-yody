import { Checkbox, Select, Col, Row, Button, Slider, Form } from "antd";
import { useEffect, useState, useMemo } from "react";
import { Link, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_LIMIT } from "../../../constants/paging";
import LazyLoad from "react-lazy-load";
import axios from "axios";

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
function ProductList() {
  const { subCategoryId } = useParams();
  console.log(
    "🚀 ~ file: index.jsx:20 ~ ProductList ~ subCategoryId:",
    typeof subCategoryId
  );
  let subCategoryIdArray = subCategoryId.split(",");
  console.log(
    "🚀 ~ file: index.jsx:36 ~ ProductList ~ subCategoryIdArray:",
    subCategoryIdArray
  );
  const [gender, setGender] = useState([subCategoryIdArray[0]]);
  const [subCategory, setSubCategory] = useState([]);

  const [listYourChoice, setlistYourChoice] = useState([]);
  const [defaultValuePrice, setDefaultValuePrice] = useState([0, 700]);
  const [active, setActive] = useState(false);
  const [activeButton, setActiveButton] = useState(1);

  const { productList } = useSelector((state) => state.product);

  const { categoryList } = useSelector((state) => state.category);
  const { sizeList } = useSelector((state) => state.size);

  const dispatch = useDispatch();

  const [filterParams, setFilterParams] = useState({
    categoryId: [],
    sizeId: [],
    subCategoryId: gender,
    page: 1,
    limit: PRODUCT_LIMIT,
  });

  useEffect(() => {
    dispatch(
      getCategoryListAction({
        subCategoryId: gender,
      })
    );
    dispatch(getSizeListAction());
    console.log("load lan dau");
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
    console.log("clone", clone);
    let nameOfIndex = clone.findIndex((item) => item.name === name);
    // let nameOfIndex = clone.indexOf(name);
    console.log(
      "🚀 ~ file: index.jsx:83 ~ removeYourChoice ~ nameOfIndex:",
      nameOfIndex
    );
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
    console.log("click top", objectname);
    let valueType = categoryIdTemp.map((item) => {
      if (item === objectname.value) {
        console.log("aaaaaaa", categoryIdTemp, item, objectname.name);
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
        console.log("bbbb", sizeIdTemp, item, objectname.name);
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
    console.log(
      "🚀 ~ file: index.jsx:147 ~ valueType ~ categoryIdTemp:",
      categoryIdTemp
    );
    console.log("🚀 ~ file: index.jsx:147 ~ valueType ~ valueType:", valueType);
  };
  let genderClone = [];
  const removeAll = () => {
    console.log("categoryIdTemp", categoryIdTemp);
    console.log("sizeIdTemp", sizeIdTemp);

    console.log("clone", clone);
    clone = [];
    setlistYourChoice(clone);

    console.log(
      "🚀 ~ file: index.jsx:182 ~ removeAll ~ filterParams:",
      filterParams
    );

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
      <div className="w-full flex flex-wrap gap-2 ">
        {list?.map((item, index) => {
          return (
            <div
              key={item.id}
              className={`p-2 mt-2 hover:bg-[#a8a3a3d8] ${
                categoryIdTemp.findIndex((a) => item.id === a) === -1
                  ? "bg-[#fcfcfc]"
                  : "bg-[#dce627]"
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
              className={`p-2 mt-2 hover:bg-[#a8a3a3d8] ${
                sizeIdTemp.findIndex((a) => item.id === a) === -1
                  ? "bg-[#fcfcfc]"
                  : "bg-[#dce627]"
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
  console.log(
    "🚀 ~ file: index.jsx:204 ~ handleFilter ~ filterParams:",
    filterParams
  );
  const handleShowMore = () => {
    dispatch(
      getProductListAction({
        ...filterParams,
        page: productList.meta.page + 1,
        limit: PRODUCT_LIMIT,
        more: true,
      })
    );
  };

  const renderCartList = (array) => {
    return array?.map((item) => {
      return (
        <Link
          key={item.id}
          className="w-full "
          to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}
        >
          <div className="overflow-hidden">
            <img
              src={item.image}
              alt="anh"
              className="  hover:scale-110 hover:duration-500 transition duration-500 "
            />
          </div>
          <p>{item.title}</p>
          <p>{item.price}đ</p>
        </Link>
      );
    });
  };

  console.log(
    "🚀 ~ file: index.jsx:288 ~ ProductList ~ defaultValuePrice:",
    defaultValuePrice
  );

  const renderListFilterPrice = (list) => {
    console.log("render lai price");
    return (
      <div className="w-[90%] ">
        <Slider
          onAfterChange={(value) => {
            console.log("999999", value);
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
              className="p-2 bg-[#ccbd18] mt-2 hover:bg-[#a8a3a3d8]"
              onClick={() => {
                removeYourChoiceTop(item);
              }}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    );
  }, [listYourChoice]);

  const CpnFilter = ({ listYourChoice, typeProduct, sizeProduct }) => {
    console.log("render filter CPN");
    return (
      <div className="col-span-1">
        <div className="flex justify-between">
          Bạn chọn:
          <div className="mr-5" onClick={() => removeAll()}>
            Bỏ hết
          </div>
        </div>
        {RenderYourChoice}
        <div className="my-4">Loại sản phẩm</div>
        {renderListFilterType(typeProduct)}
        <div className="my-4">Size</div>
        {renderListFilterSize(sizeProduct)}
        <div className="my-4">Giá</div>
        {renderListFilterPrice()}
      </div>
    );
  };
  const CpnCartList = ({ listProduct }) => {
    return (
      <div className="col-span-4 grid grid-cols-4 gap-4">
        {renderCartList(listProduct)}
        {productList.data.length !== productList.meta.total && (
          <Row justify="center" style={{ marginTop: 16 }}>
            <Button onClick={() => handleShowMore()}>Show more</Button>
          </Row>
        )}
      </div>
    );
  };

  const CpnFilterSort = () => {
    return (
      <div>
        <div className="flex justify-end">
          <Col span={8}>
            <Select
              onChange={(value) => handleFilter("sort", value)}
              placeholder="Sort by"
              style={{ width: "100%" }}
            >
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
  console.log(parseInt(subCategoryIdArray[0]) === 1);

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/subCategories/${parseInt(subCategoryIdArray[0])}`
      )
      .then((res) => {
        console.log("lay data");
        setSubCategory(res.data);
        console.log("🚀 ~ file: index.jsx:31 ~ .then ~ res.data:", res.data);
      })

      .catch((err) => {
        console.log("loi roi");
      });
  }, []);
  return (
    <div className="w-full flex flex-nowrap flex-col justify-between">
      <div className="w-full flex justify-center">
        {subCategoryIdArray.length > 1 ? (
          <> Trang chủ/{activeButton ? "Nữ" : "Nam"}</>
        ) : (
          <>Trang chủ/{subCategory.name}</>
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
                console.log(
                  "🚀 ~ file: index.jsx:419 ~ ProductList ~ activeButton:",
                  activeButton
                );
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
                console.log(
                  "🚀 ~ file: index.jsx:429 ~ ProductList ~ activeButton:",
                  activeButton
                );
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

      <CpnFilterSort></CpnFilterSort>
      <div className="w-[1200px] grid grid-cols-5">
        <CpnFilter
          listYourChoice={listYourChoice}
          typeProduct={categoryList.data}
          sizeProduct={sizeList.data}
        />
        <CpnCartList listProduct={productList.data}></CpnCartList>
      </div>
    </div>
  );
}

export default ProductList;
