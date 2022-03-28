import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import "./home.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getGeoLocation } from "../features/geolocation/geoLocationSlice";
import {
  getRealtimeWeather,
  reset as resetWeatherData,
} from "../features/realtime-weather/realtimeWeatherSlice";
import Loading from "../components/Loading";

type Props = {};

const Home = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { geoLocation, isLoading, isError, message } = useSelector(
    (state: any) => state.geoLocation
  );

  const { weatherData } = useSelector((state: any) => state.weatherData);

  const weatherIsLoading = useSelector(
    (state: any) => state.weatherData.isLoading
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isEmpty(geoLocation)) {
      dispatch(getGeoLocation());
    } else {
      const geoLatLong = geoLocation.latitude + "," + geoLocation.longitude;
      dispatch(getRealtimeWeather(geoLatLong));
    }

    return () => {
      dispatch(resetWeatherData());
    };
  }, [geoLocation, navigate, isError, message, dispatch]);

  if (isLoading || weatherIsLoading) {
    return <Loading />;
  }

  return (
    <div
      className={`container ${
        weatherData.current?.is_day === 0 ? "bg-dark" : "bg-primary"
      } bg-gradient vh-100`}
    >
      <div className="d-flex align-items-center justify-content-center flex-column">
        <img src={weatherData.current?.condition.icon} width="150" alt="" />
        <h1 className="fw-bold display-4">{weatherData.location?.region}</h1>
        <h1 className="display-4 fw-light">
          {Math.round(weatherData.current?.feelslike_c)} °
        </h1>
        <div className="mt-3 w-100">
          <div className="rounded shadow p-3 bg-gradient w-100 d-flex align-items-center">
            <i className="fas fa-wind fs-1 me-3"></i>
            <h5 className="mb-0">
              <b>Gust</b>: {weatherData.current?.gust_kph} kph
            </h5>
          </div>
          <div className="rounded shadow p-3 bg-gradient w-100 d-flex align-items-center mt-4">
            <i className="fas fa-sun-cloud fs-1 me-3"></i>
            <h5 className="mb-0">
              <b>Humidity</b>: {weatherData.current?.humidity} %
            </h5>
          </div>
          <div className="rounded shadow p-3 bg-gradient w-100 d-flex align-items-center mt-4">
            <i className="fas fa-compass fs-1 me-3"></i>
            <h5 className="mb-0">
              <b>Wind Direction</b>: {weatherData.current?.wind_degree} °
            </h5>
          </div>
          <div className="rounded shadow p-3 bg-gradient w-100 d-flex align-items-center mt-4">
            <i className="fas fa-wind-turbine fs-1 me-3"></i>
            <h5 className="mb-0">
              <b>Wind Speed</b>: {weatherData.current?.wind_kph} kph
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
