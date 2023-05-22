import { createAction } from "@reduxjs/toolkit";
import { REQUEST, REVIEW_ACTION } from "../constants";

export const getReviewAction = createAction(
  REQUEST(REVIEW_ACTION.GET_REVIEW_LIST)
);
export const sendReviewAction = createAction(
  REQUEST(REVIEW_ACTION.SEND_REVIEW)
);
