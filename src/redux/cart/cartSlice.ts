import {
  createListenerMiddleware,
  createSelector,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";
import type { MiddlewareAPI, PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  cart: CartItem[];
  discount: {
    value: number;
    errorMessage: string;
    message: string;
  };
  delivery: string;
  payment: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number | string;
  image: string;
}

export const initialState: CartState = {
  cart: [],
  discount: {
    value: 1,
    errorMessage: "",
    message: "",
  },
  delivery: "",
  payment: "",
};

enum DiscountType {
  FAKE10 = 0.9,
  FAKE20 = 0.8,
  FAKE30 = 0.7,
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state: CartState, action: PayloadAction<CartItem>) => {
      const { payload } = action;
      const cartItemIndex = state.cart.findIndex(
        (item: CartItem) => item.id === payload.id
      );
      if (cartItemIndex !== -1) {
        // @ts-ignore
        state.cart[cartItemIndex].quantity += 1;
      }
      if (cartItemIndex === -1) {
        state.cart.push(payload);
      }
    },
    removeItemFromCart: (state: CartState, action: PayloadAction<CartItem>) => {
      const { payload } = action;
      const cartItemIndex = state.cart.findIndex(
        (item: CartItem) => item.id === payload.id
      );
      if (cartItemIndex !== -1) {
        // @ts-ignore
        state.cart[cartItemIndex].quantity -= 1;
      }
    },
    updateCartItemQuantity: (
      state: CartState,
      action: PayloadAction<CartItem>
    ) => {
      const { payload } = action;
      const cartItemIndex = state.cart.findIndex(
        (item: CartItem) => item.id === payload.id
      );
      if (cartItemIndex !== -1) {
        state.cart[cartItemIndex].quantity = payload.quantity;
      }
    },
    deleteItemFromCart: (state: CartState, action: PayloadAction<CartItem>) => {
      const { payload } = action;
      const cartItemIndex = state.cart.findIndex(
        (item: CartItem) => item.id !== payload.id
      );
      state.cart.splice(cartItemIndex, 1);
      //RESET CART STATE
      if (state.cart.length === 0) {
        state.delivery = "";
        state.payment = "";
        state.discount = {
          value: 1,
          errorMessage: "",
          message: "",
        };
      }
    },
    applyDiscount: (state: CartState, action: PayloadAction<string>) => {
      const discount =
        action.payload.toLocaleUpperCase() as keyof typeof DiscountType;
      const discountType = DiscountType[discount];
      if (!discountType) {
        state.discount.errorMessage = "Invalid discount code";
        state.discount.message = "";
        state.discount.value = 1;
        return;
      }

      state.discount.message = "Discount applied";
      state.discount.errorMessage = "";
      state.discount.value = discountType;
    },
    selectDeliveryAndPaymentOption: (
      state: CartState,
      action: PayloadAction<{ name: keyof CartState; value: string }>
    ) => {
      const { name, value } = action.payload;

      if (name.includes("DEL")) {
        state.delivery = value === state.delivery ? "" : value;
      }
      if (name.includes("PAY")) {
        state.payment = value === state.payment ? "" : value;
      }
    },
  },
});

const selectCart = (state: CartState) => state.cart;
const selectDiscount = (state: CartState) => state.discount.value;

const cartTotal = (cart: CartItem[], discount: number) => {
  return {
    totalAmount:
      cart.reduce((acc, item) => {
        return acc + item.price * +item.quantity;
      }, 0) * discount,
    totalItems: cart.reduce((acc, item) => {
      return acc + +item.quantity;
    }, 0),
  };
};

export const selectCartTotal = createSelector(
  [selectCart, selectDiscount],
  (cart, discount) => cartTotal(cart, discount)
);

// Action creators are generated for each case reducer function
export const {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  deleteItemFromCart,
  applyDiscount,
  selectDeliveryAndPaymentOption,
} = cartSlice.actions;

// Create the middleware instance and methods
export const cartListenerMiddleware = createListenerMiddleware();

cartListenerMiddleware.startListening({
  matcher: isAnyOf(
    addItemToCart,
    removeItemFromCart,
    updateCartItemQuantity,
    deleteItemFromCart,
    applyDiscount,
    selectDeliveryAndPaymentOption
  ),
  effect: (action, listernerApi: MiddlewareAPI) => {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(listernerApi.getState().cart)
    );
  },
});

export default cartSlice.reducer;
