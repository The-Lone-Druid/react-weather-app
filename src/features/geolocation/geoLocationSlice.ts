import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import geoLocationService from "./geoLocationService";

const initialState = {
  geoLocation: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get geolocation data
export const getGeoLocation = createAsyncThunk(
  "geolocation/getAll",
  async (_, thunkApi: any) => {
    try {
      return await geoLocationService.getGeoLocation();
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

export const geoLocationSlice = createSlice({
  name: "geoLocation",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGeoLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGeoLocation.fulfilled, (state, action) => {
        state.geoLocation = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getGeoLocation.rejected, (state, action: any) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = geoLocationSlice.actions;
export default geoLocationSlice.reducer;
