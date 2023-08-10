import { configureStore } from "@reduxjs/toolkit";
import cartReducer, {
  cartListenerMiddleware,
  initialState,
} from "./cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(cartListenerMiddleware.middleware),
  preloadedState: {
    cart: JSON.parse(localStorage.getItem("cartItems")!) || initialState,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
