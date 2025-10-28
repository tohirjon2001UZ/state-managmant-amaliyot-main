import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  const saved = localStorage.getItem("cart");
  return saved
    ? JSON.parse(saved)
    : {
        cart: [],
        totalPrice: 0,
        totalAmount: 0,
      };
};

const recalcTotals = (state) => {
  let totalAmount = 0;
  let totalPrice = 0;
  state.cart.forEach((item) => {
    totalAmount += item.amount;
    totalPrice += item.amount * item.price;
  });
  state.totalAmount = totalAmount;
  state.totalPrice = totalPrice;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialState(),
  reducers: {
    addToCart(state, action) {
      state.cart.push(action.payload);
  recalcTotals(state);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.id != action.payload);
  recalcTotals(state);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    increase(state, action) {
      state.cart = state.cart.map((item) => {
        if (item.id == action.payload) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
  recalcTotals(state);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    decrease(state, action) {
      state.cart = state.cart
        .map((item) => {
          if (item.id == action.payload) {
            return { ...item, amount: item.amount - 1 };
          }
          return item;
        })
        .filter((item) => item.amount > 0);
  recalcTotals(state);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clear(state) {
      state.cart = [];
      state.totalPrice = 0;
      state.totalAmount = 0;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    calculateTotals(state) {
      recalcTotals(state);
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart, deleteItem, increase, decrease, clear, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
