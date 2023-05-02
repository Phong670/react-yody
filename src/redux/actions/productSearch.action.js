import { createAction } from "@reduxjs/toolkit";
import { REQUEST, PRODUCT_SEARCH_ACTION } from "../constants";

export const getProductListSearchAction = createAction(
  REQUEST(PRODUCT_SEARCH_ACTION.GET_PRODUCT_LIST_SEARCH)
);
