import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getGeoLocation } from "../features/geolocation/geoLocationSlice";
import { getRealtimeWeather } from "../features/realtime-weather/realtimeWeatherSlice";

type Props = {};

const Home = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { geoLocation, isLoading, isError, message } = useSelector(
    (state: any) => state.geoLocation
  );

  const { weatherData } = useSelector((state: any) => state.weatherData);

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
      // dispatch(resetGeoLocation());
    };
  }, [geoLocation, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>
        Current Condition:{" "}
        {!isEmpty(weatherData) && (
          <img src={weatherData.current.condition.icon} alt="" />
        )}
      </h3>
      <h3>
        Climate: {!isEmpty(weatherData) && weatherData.current.condition.text}
      </h3>
    </div>
  );
};

export default Home;
