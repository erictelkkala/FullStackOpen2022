import { useState, useEffect } from "react";
import filterForm from "./components/FilterForm";
import RenderCountryList from "./components/RenderCountries";
import filterArray from "./components/FilterArray";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  // Get the list of persons from the JSON server running on http://localhost:3001/persons
  const getCountries = () => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        // Set the country list to the response data
        setCountries(response.data);
      })
      .catch((error) => {
        // If the request fails, display the error in console
        console.log(error);
      });
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div>
      <h2>Data for countries</h2>
      {filterForm(filter, handleFilterChange)}
      {RenderCountryList(filterArray(filter, countries), filter)}
    </div>
  );
};

export default App;
