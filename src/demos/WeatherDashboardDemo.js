import React, { useState } from "react";

const weatherData = {
  mumbai: {
    city: "Mumbai",
    country: "India",
    tempC: 31,
    condition: "Partly Cloudy & Humid",
    icon: "⛅",
    highC: 33,
    lowC: 26,
    humidity: 78,
    wind: "14 km/h",
    uv: "8 (Very High)",
    aqi: "112 (Moderate)",
    hourly: [
      { time: "Now", temp: 31, icon: "⛅" },
      { time: "1 PM", temp: 33, icon: "☀️" },
      { time: "3 PM", temp: 32, icon: "🌤️" },
      { time: "5 PM", temp: 30, icon: "⛅" },
      { time: "7 PM", temp: 28, icon: "🌙" },
      { time: "9 PM", temp: 27, icon: "☁️" },
    ],
    forecast: [
      { day: "Mon", temp: "33° / 26°", icon: "⛅", cond: "Partly Cloudy" },
      { day: "Tue", temp: "32° / 25°", icon: "🌦️", cond: "Light Showers" },
      { day: "Wed", temp: "31° / 25°", icon: "🌧️", cond: "Monsoon Rain" },
      { day: "Thu", temp: "32° / 26°", icon: "⛈️", cond: "Thunderstorm" },
      { day: "Fri", temp: "33° / 27°", icon: "🌤️", cond: "Humid & Sunny" },
    ],
  },
  london: {
    city: "London",
    country: "United Kingdom",
    tempC: 14,
    condition: "Overcast & Drizzle",
    icon: "🌧️",
    highC: 16,
    lowC: 10,
    humidity: 85,
    wind: "22 km/h",
    uv: "2 (Low)",
    aqi: "32 (Good)",
    hourly: [
      { time: "Now", temp: 14, icon: "🌧️" },
      { time: "1 PM", temp: 15, icon: "🌦️" },
      { time: "3 PM", temp: 16, icon: "☁️" },
      { time: "5 PM", temp: 14, icon: "🌧️" },
      { time: "7 PM", temp: 12, icon: "🌧️" },
      { time: "9 PM", temp: 11, icon: "🌙" },
    ],
    forecast: [
      { day: "Mon", temp: "16° / 10°", icon: "🌧️", cond: "Rainy" },
      { day: "Tue", temp: "17° / 11°", icon: "⛅", cond: "Partly Cloudy" },
      { day: "Wed", temp: "18° / 12°", icon: "🌤️", cond: "Sunny Spells" },
      { day: "Thu", temp: "15° / 9°", icon: "💨", cond: "Breezy & Cool" },
      { day: "Fri", temp: "14° / 8°", icon: "🌧️", cond: "Showers" },
    ],
  },
  newyork: {
    city: "New York",
    country: "United States",
    tempC: 19,
    condition: "Crisp & Sunny",
    icon: "☀️",
    highC: 22,
    lowC: 13,
    humidity: 48,
    wind: "16 km/h",
    uv: "6 (Moderate)",
    aqi: "42 (Good)",
    hourly: [
      { time: "Now", temp: 19, icon: "☀️" },
      { time: "1 PM", temp: 22, icon: "☀️" },
      { time: "3 PM", temp: 21, icon: "🌤️" },
      { time: "5 PM", temp: 19, icon: "⛅" },
      { time: "7 PM", temp: 16, icon: "🌙" },
      { time: "9 PM", temp: 14, icon: "✨" },
    ],
    forecast: [
      { day: "Mon", temp: "22° / 13°", icon: "☀️", cond: "Clear Sky" },
      { day: "Tue", temp: "24° / 15°", icon: "🌤️", cond: "Mild & Sunny" },
      { day: "Wed", temp: "20° / 12°", icon: "🌦️", cond: "Passing Rain" },
      { day: "Thu", temp: "18° / 11°", icon: "💨", cond: "Breezy" },
      { day: "Fri", temp: "21° / 14°", icon: "☀️", cond: "Sunny" },
    ],
  },
  tokyo: {
    city: "Tokyo",
    country: "Japan",
    tempC: 23,
    condition: "Clear & Pleasant",
    icon: "🌸",
    highC: 25,
    lowC: 17,
    humidity: 62,
    wind: "11 km/h",
    uv: "5 (Moderate)",
    aqi: "28 (Good)",
    hourly: [
      { time: "Now", temp: 23, icon: "🌸" },
      { time: "1 PM", temp: 25, icon: "☀️" },
      { time: "3 PM", temp: 24, icon: "🌤️" },
      { time: "5 PM", temp: 22, icon: "⛅" },
      { time: "7 PM", temp: 20, icon: "🌙" },
      { time: "9 PM", temp: 18, icon: "✨" },
    ],
    forecast: [
      { day: "Mon", temp: "25° / 17°", icon: "☀️", cond: "Pleasant" },
      { day: "Tue", temp: "26° / 18°", icon: "🌤️", cond: "Sunny" },
      { day: "Wed", temp: "22° / 16°", icon: "🌧️", cond: "Gentle Rain" },
      { day: "Thu", temp: "24° / 17°", icon: "⛅", cond: "Partly Cloudy" },
      { day: "Fri", temp: "25° / 18°", icon: "☀️", cond: "Sunny" },
    ],
  },
};

export default function WeatherDashboardDemo() {
  const [selectedCityKey, setSelectedCityKey] = useState("mumbai");
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  const cityData = weatherData[selectedCityKey];

  const toF = (c) => Math.round((c * 9) / 5 + 32);

  const formatTemp = (c) => (isFahrenheit ? `${toF(c)}°F` : `${c}°C`);

  return (
    <div className="weather-app">
      <div className="weather-container">
        <header className="weather-topbar">
          <div className="weather-brand">
            <span>🌦️</span>
            <div>
              <h2>SkyPulse Real-Time Weather</h2>
              <p>Atmospheric telemetry &amp; live hyper-local radar</p>
            </div>
          </div>

          <div className="weather-actions">
            <div className="weather-city-selector">
              <button
                className={selectedCityKey === "mumbai" ? "active" : ""}
                onClick={() => setSelectedCityKey("mumbai")}
              >
                Mumbai
              </button>
              <button
                className={selectedCityKey === "london" ? "active" : ""}
                onClick={() => setSelectedCityKey("london")}
              >
                London
              </button>
              <button
                className={selectedCityKey === "newyork" ? "active" : ""}
                onClick={() => setSelectedCityKey("newyork")}
              >
                New York
              </button>
              <button
                className={selectedCityKey === "tokyo" ? "active" : ""}
                onClick={() => setSelectedCityKey("tokyo")}
              >
                Tokyo
              </button>
            </div>

            <button
              className="weather-unit-toggle"
              onClick={() => setIsFahrenheit(!isFahrenheit)}
            >
              Unit: {isFahrenheit ? "°F" : "°C"}
            </button>
          </div>
        </header>

        {/* Current Weather Hero Card */}
        <div className="weather-hero-card">
          <div className="weather-hero-main">
            <div className="weather-geo">
              <h1>{cityData.city}</h1>
              <span className="weather-country">{cityData.country}</span>
            </div>
            <div className="weather-temp-row">
              <span className="weather-big-icon">{cityData.icon}</span>
              <span className="weather-temp-val">{formatTemp(cityData.tempC)}</span>
            </div>
            <div className="weather-condition-text">{cityData.condition}</div>
            <div className="weather-high-low">
              H: {formatTemp(cityData.highC)} • L: {formatTemp(cityData.lowC)}
            </div>
          </div>

          <div className="weather-metrics-grid">
            <div className="weather-metric">
              <span className="metric-label">💧 Humidity</span>
              <span className="metric-val">{cityData.humidity}%</span>
            </div>
            <div className="weather-metric">
              <span className="metric-label">💨 Wind Speed</span>
              <span className="metric-val">{cityData.wind}</span>
            </div>
            <div className="weather-metric">
              <span className="metric-label">☀️ UV Radiation</span>
              <span className="metric-val">{cityData.uv}</span>
            </div>
            <div className="weather-metric">
              <span className="metric-label">🍃 Air Quality</span>
              <span className="metric-val">{cityData.aqi}</span>
            </div>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className="weather-section-box">
          <h3>Hourly Temperature Timeline</h3>
          <div className="weather-hourly-strip">
            {cityData.hourly.map((h, i) => (
              <div key={i} className="weather-hour-card">
                <span className="hour-time">{h.time}</span>
                <span className="hour-icon">{h.icon}</span>
                <span className="hour-temp">{formatTemp(h.temp)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="weather-section-box">
          <h3>5-Day Extended Weather Outlook</h3>
          <div className="weather-forecast-list">
            {cityData.forecast.map((f, i) => (
              <div key={i} className="weather-forecast-row">
                <span className="f-day">{f.day}</span>
                <span className="f-icon">{f.icon}</span>
                <span className="f-cond">{f.cond}</span>
                <span className="f-temp">{f.temp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
