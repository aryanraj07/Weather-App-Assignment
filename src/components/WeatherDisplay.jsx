import React from "react";
import { GiSunset } from "react-icons/gi";
import { CiTempHigh, CiDroplet } from "react-icons/ci";
import { FaWind, FaSun } from "react-icons/fa";
import { formatToLocalTime, iconUrlFromCode } from "../services/WeatherService";

const WeatherDisplay = ({
  weather: {
    dt,
    name,
    country,
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezoneOffset,
    hourly,
    daily,
  },
}) => {
  return (
    <>
      <div className="flex justify-center items-center my-6">
        <p className="text-white text-xl font-extralight">
          {formatToLocalTime(dt, timezoneOffset)}
        </p>
      </div>
      <div className="flex justify-center items-center my-3">
        <p className="text-white text-3xl font-medium">
          {name}
          <span className="ml-1">{country}</span>
        </p>
      </div>
      <div className="flex justify-center items-center py-6 text-cyan-300 text-xl">
        <p>{details}</p>
      </div>
      <div className="flex justify-between items-center text-white py-3">
        <img
          src={iconUrlFromCode(icon)}
          alt="weather-type-image"
          className="w-20"
        />
        <p className="text-5xl">{`${temp.toFixed()}°`}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex font-light justify-center items-center text-sm">
            <CiTempHigh size={18} className="mr-1" />
            Real feel:
            <span className="font-medium ml-1">{`${feels_like}°`}</span>
          </div>
          <div className="flex font-light justify-center items-center text-sm">
            <CiDroplet size={18} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
          </div>
          <div className="flex font-light justify-center items-center text-sm">
            <FaWind size={18} className="mr-1" />
            Wind:
            <span className="font-medium ml-1">{`${speed.toFixed()} km/hr`}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-2 py-3 text-sm text-white">
        <FaSun />
        <p className="font-light">
          Rise:{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(sunrise, timezoneOffset, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>
        <GiSunset />
        <p className="font-light">
          Set:{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(sunset, timezoneOffset, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>
        <FaSun />
        <p className="font-light">
          High:{" "}
          <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span>
        </p>
        <p className="font-light">|</p>
        <FaSun />
        <p className="font-light">
          Low:{" "}
          <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span>
        </p>
      </div>
      <div className="flex justify-start items-center mt-6">
        <p className="text-white font-medium uppercase">Hourly forecast</p>
      </div>
      <hr className="my-2 text-white" />
      <div className="flex flex-row justify-between items-center text-white">
        {hourly.map((hour) => (
          <div
            key={hour.title}
            className="flex flex-col items-center justify-center"
          >
            <p className="font-light text-sm">{hour.title}</p>
            <img
              src={iconUrlFromCode(hour.icon)}
              alt="hourly-forecast-icon"
              className="w-12 my-1"
            />
            <p className="font-medium">{`${hour.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-start items-center mt-6">
        <p className="text-white font-medium uppercase">Daily forecast</p>
      </div>
      <hr className="my-2 text-white" />
      <div className="flex flex-row justify-between items-center text-white">
        {daily.map((day) => (
          <div
            key={day.title}
            className="flex flex-col items-center justify-center"
          >
            <p className="font-light text-sm">{day.title}</p>
            <img
              src={iconUrlFromCode(day.icon)}
              alt="daily-forecast-icon"
              className="w-12 my-1"
            />
            <p className="font-medium">{`${day.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default WeatherDisplay;
