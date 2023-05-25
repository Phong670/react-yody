import { put, takeEvery, debounce } from "redux-saga/effects";
import axios from "axios";
import { PRODUCT_ACTION, REQUEST, SUCCESS, FAIL } from "../constants/";
function* getProductListSaga(action) {
  try {
    const {
      page,
      limit,
      more,
      categoryId,
      searchKey,
      subCategoryId,
      sort,
      sizeId,
      price_gte,
      price_lte,
    } = action.payload;
    //call API
    // xu ly BDB

    const result = yield axios.get("http://localhost:4000/products/", {
      params: {
        _page: page,
        _limit: limit,
        categoryId: categoryId,
        sizeId_like: sizeId,
        subCategoryId: subCategoryId,
        price_gte: price_gte,
        price_lte: price_lte,
        q: searchKey,
        ...(sort && {
          _sort: sort.split(".")[0],
          _order: sort.split(".")[1],
        }),
      },
    });

    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        data: result.data,
        meta: {
          searchKey: searchKey,
          page: page,
          limit: limit,
          total: parseInt(result.headers["x-total-count"]),
        },
        more: more,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        error: "Lỗi rồi!",
      },
    });
  }
}
function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/products?id=${id}`, {
      params: {
        _expand: ["subCategory", "category"],
      },
    });

    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: { data: result.data[0] },
    });
  } catch (e) {
    yield put({
      type: FAIL(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        error: " lỗi rồi",
      },
    });
  }
}

//function main: chay function tuong ung
export default function* productSaga() {
  yield debounce(
    300,
    REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST),
    getProductListSaga
  );
  yield takeEvery(
    REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
    getProductDetailSaga
  );
}
// ACTION >>  GET_PRODUCT_LIST_REQUEST >> RUN FUNCTION getProductListSaga
// >> call API >> success/ fail
