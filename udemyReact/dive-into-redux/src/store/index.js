import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter";
import authReducer from "./auth";

/* 
여러개의 리듀서를 하나의 리듀서로 합칠 수 있음

*/
const store = configureStore({
  // 객체를 설정해서 그 안에 속성을 정할 수 있음. configureStore가 병합해줌
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});

export default store;
