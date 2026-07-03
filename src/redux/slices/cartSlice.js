import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  pizzas: [],
};

const calcTotalPrice = (pizzas) => {
  return pizzas.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};
// TODO: доделать функционал, чтобы можно было добавить одну пиццу разного размера/из разного теста
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza(state, action) {
      const findItem = state.pizzas.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.pizzas.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = calcTotalPrice(state.pizzas);
    },
    plusItem(state, action) {
      const findItem = state.pizzas.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count++;
      }
      state.totalPrice = calcTotalPrice(state.pizzas);
    },
    minusItem(state, action) {
      const findItem = state.pizzas.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = calcTotalPrice(state.pizzas);
    },
    removePizza(state, action) {
      state.pizzas = state.pizzas.filter((obj) => obj.id !== action.payload);
      state.totalPrice = calcTotalPrice(state.pizzas);
    },
    clearPizzas(state) {
      state.pizzas = [];
      state.totalPrice = calcTotalPrice(state.pizzas);
    },
  },
});

export const { addPizza, removePizza, clearPizzas, plusItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
