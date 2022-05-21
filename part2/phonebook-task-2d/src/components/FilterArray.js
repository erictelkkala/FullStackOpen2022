const filterArray = (filter, array) => {
  // Create a new array with the filtered values
  const filteredArray = array.filter((person) =>
    // Make all names lowercase and run the filter on it
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Return the filtered array
  return filteredArray;
};

export default filterArray;
