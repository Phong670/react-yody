import { createReducer } from "@reduxjs/toolkit";
import { REQUEST, SUCCESS, FAIL, CART_ACTION } from "../constants";

const initialState = {
  cartList: {
    data: JSON.parse(localStorage.getItem("cartList")) || [],
  },
};

const cartReducer = createReducer(initialState, {
  [REQUEST(CART_ACTION.ADD_CART_LIST)]: (state, action) => {
    const { id, image, title, size, quantity } = action.payload;
    let newCartList = [...state.cartList.data];
    const indexFilter = state.cartList.data?.findIndex(
      (item) => item.id === id && item.size === size
    );
    if (indexFilter !== -1) {
      newCartList.splice(indexFilter, 1, {
        ...newCartList[indexFilter],
        quantity: newCartList[indexFilter].quantity + quantity,
      });
    } else {
      newCartList = [{ id, image, title, size, quantity }, ...newCartList];
    }
    localStorage.setItem("cartList", JSON.stringify(newCartList));
    return {
      ...state,
      cartList: {
        data: newCartList,
      },
    };
  },
  [REQUEST(CART_ACTION.DELETE_CART_ITEM)]: (state, action) => {
    const { id, size } = action.payload;
    const indexDelete = state.cartList.data?.findIndex(
      (item) => item.id === id && item.size === size
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

  [REQUEST(CART_ACTION.UPDATE_CART_ITEM)]: (state, action) => {
    const { id, size, quantity } = action.payload;
    console.log(
      "🚀 ~ file: cart.reducer.js:51 ~ [REQUEST ~ quantity:",
      quantity
    );
    console.log("🚀 ~ file: cart.reducer.js:51 ~ [REQUEST ~ id:", id);
    const indexUpdate = state.cartList.data?.findIndex(
      (item) => item.id === id && item.size === size
    );
    console.log(
      "🚀 ~ file: cart.reducer.js:54 ~ [REQUEST ~ indexUpdate:",
      indexUpdate
    );
    const newCartList = [...state.cartList.data];
    newCartList.splice(indexUpdate, 1, {
      ...newCartList[indexUpdate],
      quantity: quantity,
    });
    // newCartList.splice(indexDelete, 1);
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
