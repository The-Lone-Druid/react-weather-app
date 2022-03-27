import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import realtimeWeatherReducer from "../features/realtime-weather/realtimeWeatherSlice";

export const store = configureStore({
  reducer: {
    weatherData: realtimeWeatherReducer,
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
