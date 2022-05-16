const checkName = (nameObject, persons) => {
  // Check if the name is in the list already
  if (persons.find((person) => person.name === nameObject.name)) {
    alert(`${nameObject.name} is already added to phonebook`);
    return true;
  }
  // Check if the number is in the list already
  else if (persons.find((person) => person.number === nameObject.number)) {
    alert(`${nameObject.number} is already added to phonebook`);
    return true;
    // Check that the name is not empty
  } else if (nameObject.name === "") {
    alert("Name cannot be empty");
    return true;
  }
  return false;
};

export default checkName;
