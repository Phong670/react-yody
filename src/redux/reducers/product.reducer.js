import { createReducer } from "@reduxjs/toolkit";

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
  GET_PRODUCT_LIST_REQUEST: (state, action) => {
    return {
      ...state,
      productList: {
        ...state.productList,
        load: true,
      },
    };
  },
  GET_PRODUCT_LIST_SUCCESS: (state, action) => {
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
  GET_PRODUCT_LIST_FAIL: (state, action) => {
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

  GET_PRODUCT_DETAIL: (state, action) => {
    // get detail
    return {
      ...state,
      // productDetail
    };
  },
});

export default productReducer;
