import { useState } from "react";
import filterForm from "./components/FilterForm";
import addPersonForm from "./components/AddPersonForm";
import renderPersons from "./components/RenderPersons";
import checkName from "./components/CheckName";
import filterArray from "./components/FilterArray";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
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
