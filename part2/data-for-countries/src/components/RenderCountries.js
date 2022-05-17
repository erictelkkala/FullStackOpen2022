const RenderCountryList = (countries) => {
  // If there's more than 10 countries, display an "error"
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
    // If there's no matches, display an "error"
  } else if (countries.length === 0) {
    return <div>No matches, specify another filter</div>;
    // If there's only one country, display the country information
  } else if (countries.length === 1) {
    return CountryInfo(countries[0]);
  } else {
    // Else return the list of the countries
    return (
      <div>
        {countries.map((country) => (
          <div key={country.name.common}>{country.name.common}</div>
        ))}
      </div>
    );
  }
};

const CountryInfo = (country) => {
  // Variables for the country information
  const CountryName = country.name.common;
  const CountryCapital = country.capital;
  const CountryArea = country.area;
  const CountryLanguages = Object.values(country.languages);
  const CountryFlagSVG = country.flags.svg;

  return (
    <div>
      <h1>{CountryName}</h1>
      <div>
        <p>Capital: {CountryCapital}</p>
        <p>
          Area: {CountryArea} km<sup>2</sup>
        </p>
      </div>
      <div>
        <b>Languages:</b>
        {/* Map the languages into a list */}
        <ul>
          {CountryLanguages.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </div>
      {/* Image of the country's flag */}
      <img src={CountryFlagSVG} alt={"Flag of " + CountryName} width="200" />
    </div>
  );
};

export default RenderCountryList;
