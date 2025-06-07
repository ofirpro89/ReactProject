import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import searchReducer from "./searchSlice"; 

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer, 
});

const store = configureStore({
  reducer: rootReducer, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type TRootState = ReturnType<typeof rootReducer>;
export default store;
