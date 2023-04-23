import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getProductListSaga(action) {
  try {
    const { categoryId, searchKey, subCategoryId, sort, sizeId } =
      action.payload;
    console.log(
      "🚀 ~ file: product.saga.js:7 ~ function*getProductListSaga ~ sizeId:",
      sizeId
    );
    console.log(
      "🚀 ~ file: product.saga.js:7 ~ function*getProductListSaga ~ categoryId:",
      categoryId
    );
    console.log(
      "🚀 ~ file: product.saga.js:7 ~ function*getProductListSaga ~ subCategoryId:",
      subCategoryId
    );

    //call API
    // xu ly BDB

    const result = yield axios.get("http://localhost:4000/products/", {
      params: {
        categoryId: categoryId,
        sizeId: sizeId,
        subCategoryId: subCategoryId,
      },
    });

    yield put({
      type: "GET_PRODUCT_LIST_SUCCESS",
      payload: {
        data: result.data,
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
