import { createReducer } from "@reduxjs/toolkit";
import { REQUEST, SUCCESS, FAIL, CART_ACTION } from "../constants";

const initialState = {
  cartList: {
    data: JSON.parse(localStorage.getItem("cartList")) || [],
  },
  oneAddCard: [],
};

const cartReducer = createReducer(initialState, {
  [REQUEST(CART_ACTION.ADD_CART_LIST)]: (state, action) => {
    const { id, image, title, size, quantity, price } = action.payload;
    let newCartList = [...state.cartList.data];
    let newOneAddCard = [];
    const indexFilter = state.cartList.data?.findIndex(
      (item) => item.id === id && item.size === size
    );
    if (indexFilter !== -1) {
      newCartList.splice(indexFilter, 1, {
        ...newCartList[indexFilter],
        quantity: newCartList[indexFilter].quantity + quantity,
      });
      newOneAddCard = [{ id, image, title, size, quantity, price }];
    } else {
      newCartList = [
        { id, image, title, size, quantity, price },
        ...newCartList,
      ];
      newOneAddCard = [{ id, image, title, size, quantity, price }];
    }
    localStorage.setItem("cartList", JSON.stringify(newCartList));
    return {
      ...state,
      cartList: {
        data: newCartList,
      },
      oneAddCard: newOneAddCard,
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
  [REQUEST(CART_ACTION.DELETE_ADD_NEW_CART)]: (state, action) => {
    return {
      ...state,
      oneAddCard: [],
    };
  },

  [REQUEST(CART_ACTION.UPDATE_CART_ITEM)]: (state, action) => {
    const { id, size, quantity } = action.payload;

    const indexUpdate = state.cartList.data?.findIndex(
      (item) => item.id === id && item.size === size
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
  [REQUEST(CART_ACTION.DELETE_All_CART)]: (state, action) => {
    localStorage.setItem("cartList", JSON.stringify([]));
    return {
      ...state,
      cartList: {
        data: [],
      },
    };
  },
});
export default cartReducer;
