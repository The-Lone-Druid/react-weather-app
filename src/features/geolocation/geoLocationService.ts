import axios from "../../app/configs/axiosConfig";

// const API_URL = `current.json`;

// get geolocation data
const getGeoLocation = async () => {
  const config: {} = {};

  const response = await axios.get("https://ipapi.co/json/", config);

  return response.data;
};

const geoLocationService = {
  getGeoLocation,
};

export default geoLocationService;
