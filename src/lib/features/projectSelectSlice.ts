import { createSlice } from '@reduxjs/toolkit';

export const projectSelectSlice = createSlice({
    name: 'projectSelect',
    initialState: {
      currentProject: 'coogify',
    },
    reducers: {
      changeProject: (state, action) => {
        state.currentProject = action.payload
      }
    },
  });

  export const { changeProject } = projectSelectSlice.actions;

  export default projectSelectSlice.reducer;
  
