const filterArray = (filter, array) => {
  // Create a new array with the filtered values
  const filteredArray = array.filter((country) =>
    // Make all names lowercase and run the filter on it
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );
  // Return the filtered array
  return filteredArray;
};

export default filterArray;
