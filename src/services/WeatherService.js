import { DateTime } from "luxon";

const API_KEY = import.meta.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const formatForecastWeather = (data) => {
  const { list, city } = data;
  const timezoneOffset = city.timezone;

  const daily = list
    .filter((_, idx) => idx % 8 === 0)
    .map((d) => {
      return {
        title: formatToLocalTime(d.dt, timezoneOffset, "ccc"), // Display day for daily forecasts
        temp: d.main.temp,
        icon: d.weather[0].icon,
      };
    });

  const hourly = list.slice(0, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezoneOffset, "hh:mm a"), // Display hours for hourly forecasts
      temp: d.main.temp,
      icon: d.weather[0].icon,
    };
  });

  return { timezoneOffset, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  }).then(formatForecastWeather);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (secs, timezoneOffset, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => {
  try {
    const dateTime = DateTime.fromSeconds(secs).plus({ seconds: timezoneOffset }); // Use Luxon DateTime to handle timezone offset
    return dateTime.toFormat(format);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid DateTime";
  }
};

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;
export { formatToLocalTime, iconUrlFromCode };
