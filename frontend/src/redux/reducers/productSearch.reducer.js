import { createReducer } from "@reduxjs/toolkit";
import { PRODUCT_SEARCH_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

const initialState = {
  productSearchList: {
    data: [],
    meta: {},
    load: false,
    error: "",
  },
};

const productSearchReducer = createReducer(initialState, {
  [REQUEST(PRODUCT_SEARCH_ACTION.GET_PRODUCT_LIST_SEARCH)]: (state, action) => {
    return {
      ...state,
      productSearchList: {
        ...state.productSearchList,
        data: [],
        load: true,
      },
    };
  },
  [SUCCESS(PRODUCT_SEARCH_ACTION.GET_PRODUCT_LIST_SEARCH)]: (state, action) => {
    const { data, meta } = action.payload;
    return {
      ...state,
      productSearchList: {
        ...state.productSearchList,
        data: data,
        meta: meta,
        load: false,
      },
    };
  },
  [FAIL(PRODUCT_SEARCH_ACTION.GET_PRODUCT_LIST_SEARCH)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      productSearchList: {
        ...state.productSearchList,
        load: false,
        error: error,
      },
    };
  },
});

export default productSearchReducer;
