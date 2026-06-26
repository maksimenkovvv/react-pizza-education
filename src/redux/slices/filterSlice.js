import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sort: {
    id: 0,
    name: 'цене',
    sort: 'price',
  },
  orderType: 'asc',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setOrderType: (state) => {
      state.orderType = state.orderType === 'asc' ? 'desc' : 'asc';
    },
  },
});

export const { setCategoryId, setSort, setOrderType } = filterSlice.actions;

export default filterSlice.reducer;
