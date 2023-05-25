import { createReducer } from "@reduxjs/toolkit";
import { REVIEW_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

const initialState = {
  listReview: {
    data: [],
    page: "",
    load: false,
    total: "",
    error: "",
  },
  sendReview: {
    load: false,
    error: "",
  },
};

const reviewReducer = createReducer(initialState, {
  //GET REVIEW
  [REQUEST(REVIEW_ACTION.GET_REVIEW_LIST)]: (state, action) => {
    return {
      ...state,
      listReview: {
        ...state.listReview,
        load: true,
      },
    };
  },
  [SUCCESS(REVIEW_ACTION.GET_REVIEW_LIST)]: (state, action) => {
    console.log(
      "🚀 ~ file: review.reducer.js:17 ~ initialState.listReview.data:",
      state.listReview.data
    );
    const { data, page, sendReview, total, more } = action.payload;
    console.log("🚀 ~ file: review.reducer.js:35 ~ [SUCCESS ~ data:", data);
    return {
      ...state,
      listReview: {
        ...state.listReview,
        page: page,
        data: sendReview
          ? data
          : more
          ? [...state.listReview.data, ...data]
          : data,
        load: false,
        total: total,
        // more khac lan dau
        // unMount khi load lai trang
      },
    };
  },
  [FAIL(REVIEW_ACTION.GET_REVIEW)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      listReview: {
        ...state.listReview,
        load: false,
        error: error,
      },
    };
  },
  // SEND REVIEW
  [REQUEST(REVIEW_ACTION.SEND_REVIEW)]: (state, action) => {
    console.log("looooo");
    return {
      ...state,
      sendReview: {
        ...state.sendReview,
        load: true,
      },
    };
  },
  [SUCCESS(REVIEW_ACTION.SEND_REVIEW)]: (state, action) => {
    return {
      ...state,
      sendReview: {
        ...state.sendReview,
        load: false,
      },
    };
  },
  [FAIL(REVIEW_ACTION.SEND_REVIEW)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      sendReview: {
        ...state.sendReview,
        load: false,
        error: error,
      },
    };
  },
});

export default reviewReducer;
