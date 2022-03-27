import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import realtimeWeatherService from "./realtimeWeatherService";

const initialState = {
  weatherData: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get realtime weather data
export const getRealtimeWeather = createAsyncThunk(
  "realtimeWeather/getAll",
  async (country_name: string, thunkApi: any) => {
    try {
      return await realtimeWeatherService.getRealtimeWeather(country_name);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkApi.rejectWithValue({ message });
    }
  }
);

export const realtimeWeatherSlice = createSlice({
  name: "weatherData",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRealtimeWeather.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRealtimeWeather.fulfilled, (state, action) => {
        state.weatherData = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getRealtimeWeather.rejected, (state, action: any) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = realtimeWeatherSlice.actions;
export default realtimeWeatherSlice.reducer;
