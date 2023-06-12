import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Favorites.css";
import { setCurrentWeather } from "../../redux/slices/weatherData";

const Favorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.weatherData.favorites);
  const theme = useSelector((state) => state.layout.theme);
  const tempType = useSelector((state) => state.weatherData.tempType);

  const clickHandler = (favorite) => {
    
    // updating the currentWeather to the picked city and navigating to home page
    
    dispatch(setCurrentWeather(favorite));
    navigate("/");
  };

  return (
    <div className={`favorites-container ${theme === "dark" ? "dark" : ""}`}>
      {favorites.map((favorite, index) => (
        <div
          onClick={() => clickHandler(favorite)}
          className={`favorite-item ${theme === "dark" ? "dark" : ""}`}
          key={index}
        >
          <h4>{favorite.Key}</h4>
          <h4>{favorite.city}</h4>
          <p>
            {tempType === "c"
              ? `${favorite.metric}°C`
              : `${favorite.imperial}°F`}
          </p>
          <p>{favorite.WeatherText}</p>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
