import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, LOCATION_ACTION } from "../constants";

const initialState = {
  cityList: {
    data: [],
    loading: false,
    error: "",
  },
  districtList: {
    data: [],
    loading: false,
    error: "",
  },
  wardList: {
    data: [],
    loading: false,
    error: "",
  },
};

const locationReducer = createReducer(initialState, {
  // GET_CITY_LIST
  [REQUEST(LOCATION_ACTION.GET_CITY_LIST)]: (state, action) => {
    return {
      ...state,
      cityList: {
        ...state.cityList,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(LOCATION_ACTION.GET_CITY_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      cityList: {
        ...state.cityList,
        data: data,
        loading: false,
      },
    };
  },
  [FAIL(LOCATION_ACTION.GET_CITY_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      cityList: {
        ...state.cityList,
        loading: false,
        error: error,
      },
    };
  },
  // GET_DISTRICT_LIST
  [REQUEST(LOCATION_ACTION.GET_DISTRICT_LIST)]: (state, action) => {
    return {
      ...state,
      districtList: {
        ...state.districtList,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(LOCATION_ACTION.GET_DISTRICT_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      districtList: {
        ...state.districtList,
        data: data,
        loading: false,
      },
    };
  },
  [FAIL(LOCATION_ACTION.GET_DISTRICT_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      districtList: {
        ...state.districtList,
        loading: false,
        error: error,
      },
    };
  },
  // GET_WARD_LIST
  [REQUEST(LOCATION_ACTION.GET_WARD_LIST)]: (state, action) => {
    return {
      ...state,
      wardList: {
        ...state.wardList,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(LOCATION_ACTION.GET_WARD_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      wardList: {
        ...state.wardList,
        data: data,
        loading: false,
      },
    };
  },
  [FAIL(LOCATION_ACTION.GET_WARD_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      wardList: {
        ...state.wardList,
        loading: false,
        error: error,
      },
    };
  },
});

export default locationReducer;
