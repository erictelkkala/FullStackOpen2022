import { useState, useEffect } from "react";
import filterForm from "./components/FilterForm";
import addPersonForm from "./components/AddPersonForm";
import renderPersons from "./components/RenderPersons";
import checkName from "./components/CheckName";
import filterArray from "./components/FilterArray";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addPerson = (event) => {
    // Prevent the reload of the page
    event.preventDefault();
    // Create an object of the new person to be added
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    // Check if the name is in the list already
    if (!checkName(nameObject, persons)) {
      // Append the new person to the list
      setPersons(persons.concat(nameObject));
      setNewName("");
      setNewNumber("");
    }
  };

  // Get the list of persons from the JSON server running on http://localhost:3001/persons
  const getPersons = () => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        // Set the persons list to the response data
        setPersons(response.data);
      })
      .catch((error) => {
        // If the request fails, display the error in console
        console.log(error);
      });
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  useEffect(() => {
    getPersons();
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      {filterForm(filter, handleFilterChange)}
      <h2>Add a new person</h2>
      {addPersonForm(
        addPerson,
        newName,
        handleNameChange,
        newNumber,
        handleNumberChange
      )}
      <h2>Numbers</h2>
      {renderPersons(filterArray(filter, persons))}
    </div>
  );
};

export default App;
