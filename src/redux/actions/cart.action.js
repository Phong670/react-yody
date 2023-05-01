import { createAction } from "@reduxjs/toolkit";
import { REQUEST, SUCCESS, FAIL, CART_ACTION } from "../constants";

export const addCartListAction = createAction(
  REQUEST(CART_ACTION.ADD_CART_LIST)
);
export const updateCartItemAction = createAction(
  REQUEST(CART_ACTION.UPDATE_CART_ITEM)
);
export const deleteCartListAction = createAction(
  REQUEST(CART_ACTION.DELETE_CART_LIST)
);
