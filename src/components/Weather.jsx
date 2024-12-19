import React, { useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState({
    city: "",
    temperature: "",
    icon: "",
    wind: "",
    humidity: "",
  });
  const [myCity, setMyCity] = useState("");

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${myCity}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        city: data.name,
        icon: icon,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          type="text"
          onChange={(e) => setMyCity(e.target.value)}
          placeholder="Search"
        />
        <button onClick={search}>
          <img src={search_icon} alt="" />
        </button>
      </div>
      <img src={weatherData.icon} alt="" className="weather-icon" />
      <p className="temprature">{weatherData.temperature}°c</p>
      <p className="location">{weatherData.city}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.humidity} % </p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData.wind} Km/h </p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
