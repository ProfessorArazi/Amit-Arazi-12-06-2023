import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { getCityDataHandler } from "../../../http";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentWeather,
  setTempType,
} from "../../../redux/slices/weatherData";
import { BsFillSunFill } from "react-icons/bs";
import { RiCelsiusFill, RiFahrenheitFill } from "react-icons/ri";
import { MdDarkMode } from "react-icons/md";
import { setTheme } from "../../../redux/slices/layout";

const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.layout.theme);
  const tempType = useSelector((state) => state.weatherData.tempType);

  useEffect(() => {
    document.title = "Weather App";

    const setDefaultWeather = async () => {
      // setting Tel Aviv data as the default data

      const data = await getCityDataHandler(
        {
          Key: 215854,
          LocalizedName: "Tel Aviv",
        },
        true // the tempType should be Celsius in default
      );
      if (data) dispatch(setCurrentWeather(data)); // if there is no error im updating the state
    };

    setDefaultWeather();
  }, [dispatch, tempType]);

  return (
    <>
      <div className={`navbar ${theme === "dark" ? "dark" : ""}`}>
        <div className="top">
          <h1>Weather Task</h1>
          <div className="navbar-buttons">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/favorites" className="nav-link">
              Favorites
            </Link>
          </div>
        </div>
        <div className="actions">
          {tempType === "c" ? (
            <RiCelsiusFill
              onClick={() => dispatch(setTempType("f"))}
              size={40}
            />
          ) : (
            <RiFahrenheitFill
              onClick={() => dispatch(setTempType("c"))}
              size={40}
            />
          )}
          {theme === "light" ? (
            <BsFillSunFill
              onClick={() => dispatch(setTheme("dark"))}
              size={40}
              color="#FFD700"
            />
          ) : (
            <MdDarkMode
              size={40}
              onClick={() => dispatch(setTheme("light"))}
              className="dark-mode-icon"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
