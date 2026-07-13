import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params) => {
  const { currentPage, categoryId, sortProperty, orderType } = params;
  const { data } = await axios.get(
    `https://6a3295b3c6ca2aee438543bc.mockapi.io/pizzas?page=${currentPage}&limit=4&category=${categoryId}&sortBy=${sortProperty}&order=${orderType}`,
    //поиск локальный, потому что mockapi не хочет нормально работать(
  );
  return data;
});

const initialState = {
  items: [],
  status: 'loading',
};

export const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        console.log('Загрузка пицц...');
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = 'success';
        console.log('Успешно!', action);
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        console.log('Ошибка!', state);
        state.items = [];
      });
  },
});

export const pizzasSelector = (state) => state.pizzas;

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
