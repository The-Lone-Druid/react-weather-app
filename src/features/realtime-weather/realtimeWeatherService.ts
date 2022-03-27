import axios from "../../app/configs/axiosConfig";

const API_URL = `current.json`;

// get weather data
const getRealtimeWeather = async (country_name: string) => {
  const config: {} = {
    headers: {
      "X-RapidAPI-Host": process.env.REACT_APP_X_RAPIDAPI_HOST,
      "X-RapidAPI-Key": process.env.REACT_APP_X_RAPIDAPI_KEY,
    },
    params: {
      q: country_name,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const realtimeWeatherService = {
  getRealtimeWeather,
};

export default realtimeWeatherService;
