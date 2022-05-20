import { useState, useEffect } from "react";
import axios from "axios";

const RenderCountryList = (countries, filter) => {
  const [country, setCountry] = useState("");
  // Variables for the country information
  const [name, setName] = useState("");
  const [capital, setCapital] = useState("");
  const [area, setArea] = useState(0);
  const [languages, setLanguages] = useState([]);
  const [flag, setFlag] = useState("");
  // Variables for the weather information
  const [weather, setWeather] = useState(null);

  // Reset the view when the filter changes
  useEffect(() => {
    clearCountry();
  }, [filter]);

  // Get the country information when the country changes
  useEffect(() => {
    // If the country is not empty set the country information
    if (country) {
      setName(country.name.common);
      setCapital(country.capital);
      setArea(country.area);
      setLanguages(Object.values(country.languages));
      setFlag(country.flags.svg);
      // Finally run the weather function
      getWeather();

      // Get the weather information
      async function getWeather() {
        // Check that the capital is not empty
        if (capital !== "") {
          await axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
            )
            .then((response) => {
              // console.log(response.data);
              setWeather(response.data);
            });
        }
      }
    }
  }, [capital, country, setWeather]);

  function handleCountryChange(country) {
    // console.log("Handled country change: ", country.name.common);
    setCountry(country);
  }

  // Clear the country information
  // => If this is not done, it will query the API multiple times when a new country is selected
  function clearCountry() {
    setCountry("");
    setName("");
    setCapital("");
    setArea(0);
    setLanguages([]);
    setFlag("");
    setWeather(null);
  }

  const CountryInfo = () => {
    // Weather component
    const Weather = () => {
      if (weather === null) {
        return <p>Loading weather...</p>;
      } else {
        return (
          <div>
            <h2>Weather in {capital}</h2>
            <p>
              <b>temperature:</b> {weather.main.temp} Celsius
            </p>
            <img
              src={
                "http://openweathermap.org/img/wn/" +
                weather.weather[0].icon +
                "@2x.png"
              }
              alt="weather icon"
            />
            <p>
              <b>wind:</b> {weather.wind.speed} m/s
            </p>
          </div>
        );
      }
    };

    if (name === "") {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    } else {
      return (
        <div>
          {/* Name of the country */}
          <h1>{name}</h1>
          <div>
            {/* Capital city of the country */}
            <p>Capital: {capital}</p>
            <p>
              {/* Total size of the country */}
              Area: {area} km<sup>2</sup>
            </p>
          </div>
          <div>
            <b>Languages:</b>
            {/* Map the languages into a list */}
            <ul>
              {languages.map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          </div>
          {/* Image of the country's flag */}
          <img src={flag} alt={"Flag of " + name} width="200" />
          {/* Weather component */}
          <Weather country={country} />
        </div>
      );
    }
  };

  // If there's more than 10 countries, display an "error"
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
    // If there's only one country, set the country
  } else if (country !== "") {
    return <CountryInfo country={country} />;
    // If there's more than 1 return the list of the countries
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => handleCountryChange(country)}>show</button>
          </div>
        ))}
      </div>
    );
    // If there's no matches, display an "error"
  } else if (countries.length === 0) {
    return <div>No matches, specify another filter</div>;
  } else {
    // If the user has clicked the show button for one of the countries or there's only one country to show, display the country information
    // => country variable has a value
    handleCountryChange(countries[0]);
  }
};

export default RenderCountryList;
