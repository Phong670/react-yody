import { createAction } from "@reduxjs/toolkit";
import { REQUEST, SUCCESS, FAIL, SIZE_ACTION } from "../constants";

export const getSizeListAction = createAction(
  REQUEST(SIZE_ACTION.GET_SIZE_LIST)
);
