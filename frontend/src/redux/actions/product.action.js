import { createAction } from "@reduxjs/toolkit";
import { REQUEST, SUCCESS, FAIL, PRODUCT_ACTION } from "../constants";

export const getProductListAction = createAction(
  REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST)
);
export const getProductDetailAction = createAction(
  REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL)
);
