import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga"; //add Library saga

import productReducer from "./redux/reducers/product.reducer";
import categoryReducer from "./redux/reducers/category.reducer";
import sizeReducer from "./redux/reducers/size.reducer";
import authReducer from "./redux/reducers/auth.reducer";
import reviewReducer from "./redux/reducers/review.reducer";

import commonReducer from "./redux/reducers/common.reducer";
import cartReducer from "./redux/reducers/cart.reducer";
import productSearchReducer from "./redux/reducers/productSearch.reducer";
import locationReducer from "../src/redux/reducers/location.reducer";
import orderReducer from "../src/redux/reducers/order.reducer";

import rootSaga from "./redux/sagas"; //import yield fork for choice saga file
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    size: sizeReducer,
    auth: authReducer,
    review: reviewReducer,
    common: commonReducer,
    cart: cartReducer,
    productSearch: productSearchReducer,
    location: locationReducer,
    order: orderReducer,
  },
  //saga
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false, //offthunk
      serializableCheck: false, //off check warning parameter function
    }),
    sagaMiddleware, //add saga
  ],
});

sagaMiddleware.run(rootSaga); // run file index saga

export { store };
