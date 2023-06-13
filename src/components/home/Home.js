import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Home.css";
import { autocompleteHandler, getCityDataHandler } from "../../http";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
  setCurrentWeather,
} from "../../redux/slices/weatherData";

const Home = () => {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.weatherData.favorites);
  const currentWeather = useSelector(
    (state) => state.weatherData.currentWeather
  );
  const theme = useSelector((state) => state.layout.theme);
  const tempType = useSelector((state) => state.weatherData.tempType);

  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  const [searchValue, setSearchValue] = useState("");
  const [autocomplete, setAutoComplete] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleInputChange = async (e) => {
    // on every input change im calling the autocomplete api

    const value = e.target.value;
    setSearchValue(value);

    // if the value is empty im not calling the api

    if (!value.trim()) return setAutoComplete(null);
    const data = await autocompleteHandler(value);
    if (data) setAutoComplete(data);
  };

  const handleOptionClick = useCallback(
    // updating currentWeather with data from the api

    async (option) => {
      const data = await getCityDataHandler(option, tempType === "c");
      if (data) dispatch(setCurrentWeather(data));
      setAutoComplete(null);
    },
    [dispatch, tempType]
  );

  const addToFavoritesHandler = () => {
    dispatch(addFavorite(currentWeather));
  };

  const removeFromFavoritesHandler = () => {
    dispatch(removeFavorite(currentWeather));
  };

  const handleClickOutside = (event) => {
    // closing the dropdown if the user clicked outside

    if (
      inputRef.current &&
      autocompleteRef.current &&
      !inputRef.current.contains(event.target) &&
      !autocompleteRef.current.contains(event.target)
    ) {
      setAutoComplete(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // when the city changes im checking if the city in the favorites list

    setIsFavorite(
      favorites.some((favorite) => favorite.Key === currentWeather.Key)
    );
  }, [favorites, currentWeather.Key]);

  return (
    <>
      <div className={`input-container ${theme === "dark" ? "dark" : ""}`}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter a location"
          className={`input ${autocomplete ? "input-border-top" : ""} ${
            theme === "dark" ? "dark" : ""
          }`}
          value={searchValue}
          onChange={handleInputChange}
        />
        {autocomplete && (
          <ul
            ref={autocompleteRef}
            className={`options ${theme === "dark" ? "dark" : ""}`}
          >
            {autocomplete.map((option) => (
              <li key={option.Key} onClick={() => handleOptionClick(option)}>
                {option.LocalizedName}
              </li>
            ))}
          </ul>
        )}
      </div>
      {currentWeather.Key && (
        <div className={`container ${theme === "dark" ? "dark" : ""}`}>
          <div className="header">
            <div className="header-top">
              <h2>{currentWeather.city}</h2>
              <p>
                {tempType === "c"
                  ? `${currentWeather.metric}°C`
                  : `${currentWeather.imperial}°F`}
              </p>
            </div>
            <div className="header-buttons">
              {isFavorite ? (
                <AiFillHeart
                  onClick={removeFromFavoritesHandler}
                  color="red"
                  size={40}
                />
              ) : (
                <AiOutlineHeart onClick={addToFavoritesHandler} size={40} />
              )}
            </div>
          </div>
          <div className="content">
            <h1>{currentWeather.WeatherText}</h1>

            <div className="temperatures">
              {currentWeather.fiveDays?.map((day, index) => (
                <div className="day" key={index}>
                  <div>{day.day}</div>
                  <div>
                    {day.temp}
                    {`°${tempType.toUpperCase()}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
