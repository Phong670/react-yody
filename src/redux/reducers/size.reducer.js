import { createReducer } from "@reduxjs/toolkit";
import { REQUEST, SUCCESS, FAIL, SIZE_ACTION } from "../constants";

const initialState = {
  sizeList: {
    data: [],
    load: false,
    error: "",
  },
};

const sizeReducer = createReducer(initialState, {
  [REQUEST(SIZE_ACTION.GET_SIZE_LIST)]: (state, action) => {
    return {
      ...state,
      sizeList: {
        ...state.sizeList,
        load: true,
      },
    };
  },

  [SUCCESS(SIZE_ACTION.GET_SIZE_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      sizeList: {
        ...state.sizeList,
        data: data,
        load: false,
      },
    };
  },
  [FAIL(SIZE_ACTION.GET_SIZE_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      sizeList: {
        ...state.sizeList,
        load: false,
        error: error,
      },
    };
  },
});

export default sizeReducer;
