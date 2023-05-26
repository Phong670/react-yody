import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import {
  ORDER_ACTION,
  REQUEST,
  SUCCESS,
  FAIL,
  CART_ACTION,
} from "../constants";

function* orderProductSaga(action) {
  const { data, products, callback } = action.payload;

  try {
    const result = yield axios.post("http://localhost:4000/orders", data);

    for (let i = 0; i < products.data.length; i++) {
      yield axios.post("http://localhost:4000/orderDetails", {
        orderId: result.data.id,
        productId: products.data[i].id,
        name: products.data[i].title,
        price: products.data[i].price,
        image: products.data[i].image,
        size: products.data[i].size,
        quantity: products.data[i].quantity,
      });
    }
    const detail = yield axios.get("http://localhost:4000/orderDetails");

    yield callback();
    yield put({
      type: REQUEST(CART_ACTION.DELETE_All_CART),
    });
    yield put({
      type: SUCCESS(ORDER_ACTION.ORDER_PRODUCT),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(ORDER_ACTION.ORDER_PRODUCT),
      payload: {
        error: "Fail!",
      },
    });
  }
}

function* guestOrderProductSaga(action) {
  const { data, products, callback } = action.payload;

  try {
    const result = yield axios.post("http://localhost:4000/guestOrders", data);

    for (let i = 0; i < products.data.length; i++) {
      yield axios.post("http://localhost:4000/guestOrderDetails", {
        guestOrderId: result.data.id,
        productId: products.data[i].id,
        name: products.data[i].title,
        price: products.data[i].price,
        image: products.data[i].image,
        size: products.data[i].size,
        quantity: products.data[i].quantity,
      });
    }
    const detail = yield axios.get("http://localhost:4000/guestOrderDetails");

    yield callback(true);
    //DELETE CART
    yield put({
      type: REQUEST(CART_ACTION.DELETE_All_CART),
    });
    yield put({
      type: SUCCESS(ORDER_ACTION.ORDER_PRODUCT),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(ORDER_ACTION.ORDER_PRODUCT),
      payload: {
        error: "Fail!",
      },
    });
  }
}

function* getOrderProductListSaga(action) {
  try {
    const { userId } = action.payload;
    const result = yield axios.get("http://localhost:4000/orders", {
      params: {
        userId: userId,
        _embed: "orderDetails",
      },
    });

    yield put({
      type: SUCCESS(ORDER_ACTION.GET_ORDER_PRODUCT_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(ORDER_ACTION.GET_ORDER_PRODUCT_LIST),
      payload: {
        error: "Fail",
      },
    });
  }
}

export default function* locationSaga() {
  yield takeEvery(REQUEST(ORDER_ACTION.ORDER_PRODUCT), orderProductSaga);
  yield takeEvery(
    REQUEST(ORDER_ACTION.GUEST_ORDER_PRODUCT),
    guestOrderProductSaga
  );

  yield takeEvery(
    REQUEST(ORDER_ACTION.GET_ORDER_PRODUCT_LIST),
    getOrderProductListSaga
  );
}
