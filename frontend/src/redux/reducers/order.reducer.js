import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, ORDER_ACTION } from "../constants";

const initialState = {
  orderList: {
    data: [],
    loading: false,
    error: "",
  },
};

const orderReducer = createReducer(initialState, {
  [REQUEST(ORDER_ACTION.GET_ORDER_PRODUCT_LIST)]: (state, action) => {
    return {
      ...state,
      orderList: {
        ...state.orderList,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(ORDER_ACTION.GET_ORDER_PRODUCT_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      orderList: {
        ...state.orderList,
        data: data,
        loading: false,
      },
    };
  },
  [FAIL(ORDER_ACTION.GET_ORDER_PRODUCT_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      orderList: {
        ...state.orderList,
        loading: false,
        error: error,
      },
    };
  },
});

export default orderReducer;
