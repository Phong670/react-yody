import { Checkbox } from "antd";
import { useEffect, useState } from "react";
import { Link, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_LIMIT } from "../../../constants/paging";

import { useParams, useLocation } from "react-router-dom";
import {
  getProductListAction,
  getCategoryListAction,
  getSizeListAction,
} from "../../../redux/actions";

function ProductList() {
  const { subCategoryId } = useParams();
  const [listYourChoice, setlistYourChoice] = useState([]);
  const { productList } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);
  const { sizeList } = useSelector((state) => state.size);
  const dispatch = useDispatch();
  const [filterParams, setFilterParams] = useState({
    categoryId: [],
    sizeId: [],
    subCategoryId: subCategoryId,
  });
  useEffect(() => {
    dispatch(getProductListAction(filterParams));
    dispatch(
      getCategoryListAction({
        subCategoryId: subCategoryId,
      })
    );
    dispatch(getSizeListAction());
  }, []);

  const priceProduct = [
    {
      id: 100,
      name: "Nhỏ hơn 100.000đ",
    },
    {
      id: 200,
      name: "Từ 100.000đ - 200.000đ",
    },
    {
      id: 350,
      name: "Từ 200.000đ - 350.000đ",
    },

    {
      id: 500,
      name: "Từ 350.000đ - 500.000đ",
    },
    {
      id: 700,
      name: "Từ 500.000đ - 700.000đ",
    },
    {
      id: 701,
      name: "Lớn hơn 700.000đ",
    },
  ];
  const renderCartList = (array) => {
    return array?.map((item) => {
      return (
        <div key={item.id} className="w-full ">
          <div className="overflow-hidden">
            <img
              src={item.image}
              alt="anh"
              className="  hover:scale-110 hover:duration-500 transition duration-500 "
            />
          </div>
          <p>{item.title}</p>
          <p>{item.price}đ</p>
        </div>
      );
    });
  };
  let categoryIdTemp = [...filterParams.categoryId];
  let sizeIdTemp = [...filterParams.sizeId];

  let clone = [...listYourChoice];
  useEffect(() => {
    dispatch(getProductListAction(filterParams));
  }, [filterParams]);

  const removeYourChoiceSize = (array, values, name) => {
    let indexGetAPI = array.indexOf(values);
    console.log(
      "🚀 ~ file: index.jsx:90 ~ removeYourChoiceSize ~ indexGetAPI:",
      indexGetAPI
    );
    array.splice(indexGetAPI, 1);
    let nameOfIndex = clone.indexOf(name);
    clone.splice(nameOfIndex, 1);
  };

  const checkAddYourChoiceType = (name, name2, valuesId) => {
    let type = categoryIdTemp.find((type) => type === valuesId);
    const addYourChoice = (name) => {
      clone.push(name);
      setlistYourChoice(clone);
    };
    const handleFilterType = (values) => {
      categoryIdTemp = [...filterParams.categoryId, values];
      setFilterParams({
        ...filterParams,
        categoryId: categoryIdTemp,
      });
    };
    if (!type) {
      addYourChoice(name);
      handleFilterType(valuesId);
    } else {
      removeYourChoiceSize(categoryIdTemp, type, name);
      setFilterParams({
        ...filterParams,
        categoryId: categoryIdTemp,
      });
      setlistYourChoice(clone);
    }
  };
  const checkAddYourChoiceSize = (name, name2, valuesId) => {
    let size = sizeIdTemp.find((size) => size === valuesId);
    const addYourChoice = (name) => {
      clone.push(name);
      setlistYourChoice(clone);
    };
    console.log("🚀 ~ file: index.jsx:111 ~ addYourChoice ~ clone:", clone);
    const handleFilterSize = (values) => {
      sizeIdTemp = [...filterParams.sizeId, values];
      setFilterParams({
        ...filterParams,
        sizeId: sizeIdTemp,
      });

      dispatch(getProductListAction(filterParams));
    };
    if (!size) {
      addYourChoice(name);
      handleFilterSize(valuesId);
    } else {
      removeYourChoiceSize(sizeIdTemp, size, name);
      setFilterParams({
        ...filterParams,
        sizeId: sizeIdTemp,
      });
      setlistYourChoice(clone);
    }
  };
  // console.log("tets", checkAddYourChoice([1, 2, 3], 4));
  const renderListFilterType = (list) => {
    return (
      <div className="w-full flex flex-wrap gap-2 ">
        {list?.map((item, index) => {
          return (
            <div
              key={item.id}
              className="p-2 bg-[#F2F2F2] mt-2 hover:bg-[#a8a3a3d8]"
              onClick={() =>
                checkAddYourChoiceType(item.name, "catalogyId", item.id)
              }
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
              className="p-2 bg-[#F2F2F2] mt-2 hover:bg-[#a8a3a3d8]"
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

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const renderListFilterChecker = (list) => {
    return (
      <div className="w-full flex justify-start flex-wrap gap-2 ">
        {list?.map((item, index) => {
          return (
            <Checkbox key={index} className="m-2" onChange={onChange}>
              {item.name}
            </Checkbox>
          );
        })}
      </div>
    );
  };

  // const pushYourChoice = (name, key, values) => {
  //   clone.push({ name: name, [key]: values });
  //   setlistYourChoice(clone);
  // };

  const renderYourChoice = (listYourChoice) => {
    return (
      <div className="w-full flex flex-wrap gap-2 ">
        {listYourChoice?.map((item, index) => {
          return (
            <div
              key={index}
              className="p-2 bg-[#ccbd18] mt-2 hover:bg-[#a8a3a3d8]"
            >
              {item}
            </div>
          );
        })}
      </div>
    );
  };

  const CpnFilter = ({ typeProduct, sizeProduct, priceProduct }) => {
    return (
      <div className="col-span-1">
        <div>Bạn chọn:</div>
        {renderYourChoice(listYourChoice)}
        <div className="my-4">Loại sản phẩm</div>
        {renderListFilterType(typeProduct)}
        <div className="my-4">Size</div>
        {renderListFilterSize(sizeProduct)}
        <div className="my-4">Giá</div>
        {renderListFilterChecker(priceProduct)}
      </div>
    );
  };
  const CpnCartList = ({ listProduct }) => {
    return (
      <div className="col-span-4 grid grid-cols-4 gap-4">
        {renderCartList(listProduct)}
      </div>
    );
  };

  return (
    <div className="w-[1200px] grid grid-cols-5">
      <CpnFilter
        typeProduct={categoryList.data}
        sizeProduct={sizeList.data}
        priceProduct={priceProduct}
      />
      <CpnCartList listProduct={productList.data}></CpnCartList>
    </div>
  );
}

export default ProductList;
