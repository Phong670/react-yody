import { createAction } from "@reduxjs/toolkit";
import { CATEGORY_ACTION, REQUEST } from "../constants";
export const getCategoryListAction = createAction(
  REQUEST(CATEGORY_ACTION.GET_CATEGORY_LIST)
);
