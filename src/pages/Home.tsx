import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getRealtimeWeather,
  reset,
} from "../features/realtime-weather/realtimeWeatherSlice";
import axios from "axios";

type Props = {};

const Home = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [latLong, setLatLong] = useState("");

  const { weatherData, isLoading, isError, message } = useSelector(
    (state: any) => state.weatherData
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        dispatch(getRealtimeWeather(data.latitude + "," + data.longitude));
        setLatLong(data.latitude + "," + data.longitude);
      })
      .catch((error) => {
        return error;
      });

    return () => {
      dispatch(reset());
    };
  }, [navigate, isError, message, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>Your Latlog is: {latLong}</div>;
};

export default Home;
