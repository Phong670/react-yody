import { put, takeEvery, debounce } from "redux-saga/effects";
import axios from "axios";
import { PRODUCT_SEARCH_ACTION, REQUEST, SUCCESS, FAIL } from "../constants/";
function* getProductListSearchSaga(action) {
  try {
    const { page, limit, searchKey } = action.payload;

    //call API
    // xu ly BDB

    const result = yield axios.get("http://localhost:4000/products/", {
      params: {
        _page: page,
        _limit: limit,
        q: searchKey,
      },
    });

    yield put({
      type: SUCCESS(PRODUCT_SEARCH_ACTION.GET_PRODUCT_LIST_SEARCH),
      payload: {
        data: result.data,
        meta: {
          page: page,
          limit: limit,
          total: parseInt(result.headers["x-total-count"]),
        },
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(PRODUCT_SEARCH_ACTION.GET_PRODUCT_LIST_SEARCH),
      payload: {
        error: "Lỗi rồi!",
      },
    });
  }
}

//function main: chay function tuong ung
export default function* productSaga() {
  yield debounce(
    300,
    REQUEST(PRODUCT_SEARCH_ACTION.GET_PRODUCT_LIST_SEARCH),
    getProductListSearchSaga
  );
}
// ACTION >>  GET_PRODUCT_LIST_REQUEST >> RUN FUNCTION getProductListSaga
// >> call API >> success/ fail
