const checkName = (nameObject, persons, updatePerson) => {
  // Check if the name is in the list already
  if (persons.find((person) => person.name === nameObject.name)) {
    const oldID = persons.find((person) => person.name === nameObject.name).id;
    // If the name is in the list, ask the user if he wants to update the number
    if (
      window.confirm(
        `${nameObject.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      // Update the person in the list
      updatePerson(oldID, nameObject);
    }
    return true;
    // Check that the name is not empty
  } else if (nameObject.name === "") {
    alert("Name cannot be empty");
    return true;
  }
  return false;
};

export default checkName;
