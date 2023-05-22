import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

const commonReducer = createReducer(initialState, {
  CHANGE_THEME: (state, action) => {
    return {
      ...state,
      theme: action.payload,
    };
  },
});

export default commonReducer;
