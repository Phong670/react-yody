import { put, takeEvery } from "redux-saga/effects";
import { notification } from "antd";
import axios from "axios";

import { AUTH_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* loginSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post("http://localhost:4000/login", data);

    yield localStorage.setItem("accessToken", result.data.accessToken);
    yield callback(result.data.user.role);
    yield put({
      type: SUCCESS(AUTH_ACTION.LOGIN),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.LOGIN),
      payload: {
        error: "Email hoặc password không đúng",
      },
    });
  }
}
function* changePasswordSaga(action) {
  try {
    const { oldData, newPassword, idUser, callback } = action.payload;
    const result = yield axios.post("http://localhost:4000/login", oldData);
    yield localStorage.setItem("accessToken", result.data.accessToken);

    yield axios.patch(`http://localhost:4000/users/${idUser}`, newPassword);
    yield put({
      type: SUCCESS(AUTH_ACTION.CHANGE_PASSWORD),
    });
    yield callback("success");
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.CHANGE_PASSWORD),
      payload: {
        error: e.response.data,
      },
    });
  }
}
function* forgotPasswordSaga(action) {
  try {
    const { data, callback } = action.payload;

    let password = {
      password: data.password,
    };
    yield axios.patch(`http://localhost:4000/users/${data.id}`, password);
    yield put({
      type: SUCCESS(AUTH_ACTION.FORGOT_PASSWORD),
    });
    console.log("truoc call saga");
    yield callback("success");
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.FORGOT_PASSWORD),
      payload: {
        error: e.response?.data,
      },
    });
  }
}
function* registerSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post("http://localhost:4000/register", data);

    yield put({
      type: SUCCESS(AUTH_ACTION.REGISTER),
      payload: {
        data: result.data,
      },
    });
    yield notification.success({
      message: "Đăng kí tài khoản thành công",
    });
    yield callback();
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.REGISTER),
      payload: {
        error: e.response.data,
      },
    });
  }
}

function* getUserInfoSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/users/${id}`);
    yield put({
      type: SUCCESS(AUTH_ACTION.GET_USER_INFO),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.GET_USER_INFO),
      payload: {
        error: "Lỗi!",
      },
    });
  }
}

export default function* authSaga() {
  yield takeEvery(REQUEST(AUTH_ACTION.LOGIN), loginSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.REGISTER), registerSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.GET_USER_INFO), getUserInfoSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.CHANGE_PASSWORD), changePasswordSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.FORGOT_PASSWORD), forgotPasswordSaga);
}
