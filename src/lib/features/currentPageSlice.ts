import { createSlice } from '@reduxjs/toolkit';

export const currentPageSlice = createSlice({
    name: 'currentPage',
    initialState: {
      currentPage: 'overview',
    },
    reducers: {
      changePage: (state, action) => {
        state.currentPage = action.payload
      }
    },
  });

  export const { changePage } = currentPageSlice.actions;

  export default currentPageSlice.reducer;
  
