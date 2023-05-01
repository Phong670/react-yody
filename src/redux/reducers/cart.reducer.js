import { createReducer } from "@reduxjs/toolkit";
import { REQUEST, SUCCESS, FAIL, CART_ACTION } from "../constants";

const initialState = {
  cartList: {
    data: JSON.parse(localStorage.getItem("cartList")) || [],
  },
};

const cartReducer = createReducer(initialState, {
  [REQUEST(CART_ACTION.ADD_CART_LIST)]: (state, action) => {
    const [data] = action.payload;
    const newCartList = [data, ...state.cartList.data];
    localStorage.setItem("cartList", JSON.stringify(newCartList));
    return {
      ...state,
      cartList: {
        data: newCartList,
      },
    };
  },
  [REQUEST(CART_ACTION.DELETE_CART_LIST)]: (state, action) => {
    const [id] = action.payload;
    const indexDelete = state.cartList.data?.findIndex(
      (item) => item.id === id
    );
    const newCartList = [...state.cartList.data];
    newCartList.splice(indexDelete, 1);
    localStorage.setItem("cartList", JSON.stringify(newCartList));
    return {
      ...state,
      cartList: {
        data: newCartList,
      },
    };
  },
  [REQUEST(CART_ACTION.UPDATE_CART_LIST)]: (state, action) => {
    const [id] = action.payload;
    const indexDelete = state.cartList.data?.findIndex(
      (item) => item.id === id
    );
    const newCartList = [...state.cartList.data];
    newCartList.splice(indexDelete, 1);
    localStorage.setItem("cartList", JSON.stringify(newCartList));
    return {
      ...state,
      cartList: {
        data: newCartList,
      },
    };
  },
});
export default cartReducer;
