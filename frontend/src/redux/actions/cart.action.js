import { createAction } from "@reduxjs/toolkit";
import { REQUEST, CART_ACTION } from "../constants";

export const addCartListAction = createAction(
  REQUEST(CART_ACTION.ADD_CART_LIST)
);
export const updateCartItemAction = createAction(
  REQUEST(CART_ACTION.UPDATE_CART_ITEM)
);
export const deleteCartItemAction = createAction(
  REQUEST(CART_ACTION.DELETE_CART_ITEM)
);
export const deleteAddNewCard = createAction(
  REQUEST(CART_ACTION.DELETE_ADD_NEW_CART)
);
export const deleteAllCard = createAction(REQUEST(CART_ACTION.DELETE_All_CART));
