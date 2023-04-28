import { fork } from "redux-saga/effects";

import productSaga from "./product.saga";
import categorySaga from "./category.saga";
import sizeSaga from "./size.saga";
import authSaga from "./auth.saga";
import reviewSaga from "./review.saga";

export default function* rootSaga() {
  yield fork(productSaga);
  yield fork(categorySaga);
  yield fork(sizeSaga);
  yield fork(authSaga);
  yield fork(reviewSaga);
}
