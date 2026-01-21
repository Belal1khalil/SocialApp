import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/user.slice";
import { postsReducer } from "./features/posts.slice";

export const myStore = configureStore({
  reducer: {
    userReducer,
    postsReducer,
  },
});

type AppStore = typeof myStore;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"]
