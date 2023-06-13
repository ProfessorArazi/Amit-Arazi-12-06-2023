import axios from "axios";
import { toast } from "react-toastify";

const toastErrorHandler = () => {
  // show error toastify

  toast.error("Something went wrong, check your API key", {
    position: "top-left",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

export const autocompleteHandler = async (value) => {
  // get autocomplete data

  const data = await axios(
    `${process.env.REACT_APP_API_URL}/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_API_KEY}&q=${value}`
  )
    .then((res) => {
      return res.data;
    })
    .catch((error) => toastErrorHandler());
  return data;
};

export const getCityDataHandler = async (option, metric) => {
  // getting the five days of the city and if there is an error i'm stopping the function
  // from updating the current weather with no data.
  // if the five days function runs with no problems im fetching the data for today and returning it.

  const fiveDays = await getFiveDaysHandler(option, metric);
  if (!fiveDays) return;
  const data = await axios(
    `${process.env.REACT_APP_API_URL}/currentconditions/v1/${option.Key}?apikey=${process.env.REACT_APP_API_KEY}`
  )
    .then((res) => {
      return {
        city: option.LocalizedName || option.city,
        metric: res.data[0].Temperature.Metric.Value,
        imperial: res.data[0].Temperature.Imperial.Value,
        WeatherText: res.data[0].WeatherText,
        Key: option.Key,
        ...fiveDays,
      };
    })
    .catch((error) => toastErrorHandler());
  return data;
};

export const getFiveDaysHandler = async (option, metric) => {
  // getting the five days data

  const fiveDays = await axios(
    `${process.env.REACT_APP_API_URL}/forecasts/v1/daily/5day/${option.Key}?apikey=${process.env.REACT_APP_API_KEY}&metric=${metric}`
  )
    .then((res) => {
      return {
        fiveDays: res.data.DailyForecasts.map((element) => ({
          day: new Date(element.Date).toLocaleString("en-US", {
            weekday: "short",
          }),
          temp: Math.ceil(
            (element.Temperature.Maximum.Value +
              element.Temperature.Minimum.Value) /
              2
          ),
        })),
      };
    })
    .catch((error) => toastErrorHandler());
  return fiveDays;
};
