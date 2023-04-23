import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

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
    } = action.payload;
    console.log(
      "🚀 ~ file: product.saga.js:7 ~ function*getProductListSaga ~ Sort:",
      page,
      limit
    );

    //call API
    // xu ly BDB

    const result = yield axios.get("http://localhost:4000/products/", {
      params: {
        _page: page,
        _limit: limit,
        categoryId: categoryId,
        sizeId: sizeId,
        subCategoryId: subCategoryId,
        ...(sort && {
          _sort: sort.split(".")[0],
          _order: sort.split(".")[1],
        }),
      },
    });

    yield put({
      type: "GET_PRODUCT_LIST_SUCCESS",
      payload: {
        data: result.data,
        meta: {
          page: page,
          limit: limit,
          total: parseInt(result.headers["x-total-count"]),
        },
        more: more,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_PRODUCT_LIST_FAIL",
      payload: {
        error: "Lỗi rồi!",
      },
    });
  }
}

//function main: chay function tuong ung
export default function* productSaga() {
  yield takeEvery("GET_PRODUCT_LIST_REQUEST", getProductListSaga);
}
// ACTION >>  GET_PRODUCT_LIST_REQUEST >> RUN FUNCTION getProductListSaga
// >> call API >> success/ fail
