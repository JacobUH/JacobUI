import { configureStore } from '@reduxjs/toolkit';
import { projectModalSlice } from './features/projectModalSlice';
import projectSelectSlice from './features/projectSelectSlice';
import { WeatherSlice } from './features/weatherSlice';
import { currentPageSlice } from './features/currentPageSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      currentPage: currentPageSlice.reducer,
      projectModal: projectModalSlice.reducer,
      projectSelect: projectSelectSlice,
      weatherState: WeatherSlice.reducer
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
