import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
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
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setOrderType: (state) => {
      state.orderType = state.orderType === 'asc' ? 'desc' : 'asc';
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sortList;
    },
  },
});

export const filterSelector = (state) => state.filter;
export const currentPageSelector = (state) => state.filter.currentPage;

export const { setCategoryId, setSearchValue, setSort, setOrderType, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
