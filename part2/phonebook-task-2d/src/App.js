import { useState, useEffect } from "react";
import filterForm from "./components/FilterForm";
import addPersonForm from "./components/AddPersonForm";
import renderPersons from "./components/RenderPersons";
import checkName from "./components/CheckName";
import filterArray from "./components/FilterArray";
import PersonService from "./services/PersonService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  // Event handler for adding a new person
  const addPerson = (event) => {
    // Create an object of the new person to be added
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    // Prevent the reload of the page
    event.preventDefault();

    // Check if the name is in the list already
    if (!checkName(nameObject, persons, updatePerson)) {
      // Append the new person to the list if the response was successful
      PersonService.create(nameObject).then((response) => {
        setPersons(persons.concat(response));
        // Reset the form
        setNewName("");
        setNewNumber("");
      });
    }
  };

  // Event handler for removing a person
  const removePerson = (name, id) => {
    // Remove the person from the array
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      PersonService.remove(id).then((response) => {
        const newList = persons.filter((person) => person.id !== id);
        setPersons(newList);
      });
    }
  };

  // Event handler for updating a person
  const updatePerson = (id, newObject) => {
    PersonService.update(id, newObject).then((response) => {
      const newList = persons.map((person) =>
        person.id === id ? response : person
      );
      setPersons(newList);
      // Reset the form
      setNewName("");
      setNewNumber("");
    });
  };

  const handleNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    // console.log(event.target.value);
    setFilter(event.target.value);
  };

  // Fetch the list of persons from the server when the page is loaded
  useEffect(() => {
    PersonService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  if (persons === Array.empty) {
    console.log(persons);
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  } else {
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
        {renderPersons(filterArray(filter, persons), removePerson)}
      </div>
    );
  }
};

export default App;
