import { fork } from "redux-saga/effects";

import productSaga from "./product.saga";
import categorySaga from "./category.saga";

export default function* rootSaga() {
  yield fork(productSaga);
  yield fork(categorySaga);
}
