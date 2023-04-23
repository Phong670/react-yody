import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  sizeList: {
    data: [],
    load: false,
    error: "",
  },
};

const sizeReducer = createReducer(initialState, {
  GET_SIZE_LIST_REQUEST: (state, action) => {
    return {
      ...state,
      sizeList: {
        ...state.sizeList,
        load: true,
      },
    };
  },

  GET_SIZE_LIST_SUCCESS: (state, action) => {
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
  GET_SIZE_LIST_FAIL: (state, action) => {
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
