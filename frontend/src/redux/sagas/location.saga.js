import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import { LOCATION_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* getCityListSaga(action) {
  try {
    const result = yield axios.get("http://localhost:4000/cities");

    yield put({
      type: SUCCESS(LOCATION_ACTION.GET_CITY_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(LOCATION_ACTION.GET_CITY_LIST),
      payload: {
        error: "Fail!",
      },
    });
  }
}

function* getDistrictListSaga(action) {
  try {
    const { cityCode } = action.payload;
    const result = yield axios.get("http://localhost:4000/districts", {
      params: {
        parentcode: cityCode,
      },
    });
    yield put({
      type: SUCCESS(LOCATION_ACTION.GET_DISTRICT_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(LOCATION_ACTION.GET_DISTRICT_LIST),
      payload: {
        error: e.response.data,
      },
    });
  }
}

function* getWardListSaga(action) {
  try {
    const { districtCode } = action.payload;
    const result = yield axios.get("http://localhost:4000/wards", {
      params: {
        parentcode: districtCode,
      },
    });
    yield put({
      type: SUCCESS(LOCATION_ACTION.GET_WARD_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(LOCATION_ACTION.GET_WARD_LIST),
      payload: {
        error: e.response.data,
      },
    });
  }
}

export default function* locationSaga() {
  yield takeEvery(REQUEST(LOCATION_ACTION.GET_CITY_LIST), getCityListSaga);
  yield takeEvery(
    REQUEST(LOCATION_ACTION.GET_DISTRICT_LIST),
    getDistrictListSaga
  );
  yield takeEvery(REQUEST(LOCATION_ACTION.GET_WARD_LIST), getWardListSaga);
}
