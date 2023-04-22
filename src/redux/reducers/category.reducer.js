import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  categoryList: {
    data: [],
    load: false,
    error: "",
  },
};

const categoryReducer = createReducer(initialState, {
  GET_CATEGORY_LIST_REQUEST: (state, action) => {
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        load: true,
      },
    };
  },
  GET_CATEGORY_LIST_SUCCESS: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        data: data,
        load: false,
      },
    };
  },
  GET_CATEGORY_LIST_FAIL: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        load: false,
        error: error,
      },
    };
  },
});

export default categoryReducer;
