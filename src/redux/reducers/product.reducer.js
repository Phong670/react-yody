import { createReducer } from "@reduxjs/toolkit";
import { PRODUCT_ACTION, REQUEST, SUCCESS, FAIL } from "../constants/";

const initialState = {
  productList: {
    data: [],
    meta: {},
    load: false,
    error: "",
  },
  productDetail: {
    data: {},
    load: false,
    error: "",
  },
};

const productReducer = createReducer(initialState, {
  [REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    return {
      ...state,
      productList: {
        ...state.productList,
        load: true,
      },
    };
  },
  [SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    const { data, meta, more } = action.payload;
    return {
      ...state,
      productList: {
        ...state.productList,
        data: more ? [...state.productList.data, ...data] : data,
        meta: meta,
        load: false,
      },
    };
  },
  [FAIL(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      productList: {
        ...state.productList,
        load: false,
        error: error,
      },
    };
  },
  // GET_PRODUCT_DETAIL
  [REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        load: true,
      },
    };
  },
  [SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    console.log("🚀 ~ file: product.reducer.js:62 ~ [SUCCESS ~ data:", data);
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        data: data,
        load: false,
      },
    };
  },
  [FAIL(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        load: false,
        error: error,
      },
    };
  },
});

export default productReducer;
