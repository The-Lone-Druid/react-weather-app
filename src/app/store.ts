import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import realtimeWeatherReducer from "../features/realtime-weather/realtimeWeatherSlice";
import getGeoLocationReducer from "../features/geolocation/geoLocationSlice";

export const store = configureStore({
  reducer: {
    weatherData: realtimeWeatherReducer,
    geoLocation: getGeoLocationReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
