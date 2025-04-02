import { createSlice } from '@reduxjs/toolkit';

export const projectModalSlice = createSlice({
  name: 'projectModal',
  initialState: {
    isOpen: false,
    currentImage: '',
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.currentImage = action.payload
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.currentImage = '';
    },
  },
});

export const { openModal, closeModal } = projectModalSlice.actions;

export default projectModalSlice.reducer;
