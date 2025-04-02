import { createSlice } from '@reduxjs/toolkit';
import { WeatherData } from '../../../resources/interface';

interface WeatherState {
    data: WeatherData | null;
    loading: boolean;
    error: string | null;
}

const initialState: WeatherState = {
    data: null,
    loading: false,
    error: null,
};

export const WeatherSlice = createSlice({
  name: 'weatherSlice',
  initialState,
  reducers: {
    fetchWeatherStart: (state) => {
        state.loading = true;
        state.error = null;
    },
    fetchWeatherSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
    },
    fetchWeatherFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload
    }
  },
});

export const { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure } = WeatherSlice.actions;

export default WeatherSlice.reducer;
