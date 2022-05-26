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
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    } else if (errorMessage !== null) {
      return <div className="error">{message}</div>;
    } else {
      return <div className="success">{message}</div>;
    }
  };

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
      PersonService.create(nameObject)
        .then((response) => {
          setPersons(persons.concat(response));
          // Set the success message
          setSuccessMessage(`Added ${newName}`);
          // Remove the notification after 5 seconds
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
          // Reset the form
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          // Set the error message
          setErrorMessage(error.message);
          // Remove the notification after 5 seconds
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  // Event handler for removing a person
  const removePerson = (name, id) => {
    // Remove the person from the array
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      PersonService.remove(id)
        .then(() => {
          setSuccessMessage(`Deleted ${name}`);
          // Remove the notification after 5 seconds
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
          // Update the list of persons
          const newList = persons.filter((person) => person.id !== id);
          setPersons(newList);
        })
        .catch((error) => {
          // If the request can't find the person, display that the person has been deleted already
          if (error.response.status === 404) {
            setErrorMessage(
              `Information of ${name} has already been removed from the server`
            );
          } else {
            // Set the error message
            setErrorMessage(error.message);
          }
          // Remove the notification after 5 seconds
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  // Event handler for updating a person
  const updatePerson = (id, newObject) => {
    PersonService.update(id, newObject)
      .then((response) => {
        setSuccessMessage(`Updated ${response.name}`);
        // Remove the notification after 5 seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
        // Update the list of persons
        const newList = persons.map((person) =>
          person.id === id ? response : person
        );
        setPersons(newList);
        // Reset the form
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        // Set the error message
        setErrorMessage(error.message);
        // Remove the notification after 5 seconds
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
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
    // console.log(persons);
    // Return a loading message if the list of persons is empty
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Phonebook</h2>
        {/* 2 different notification components for success and error messages */}
        <Notification message={errorMessage} />
        <Notification message={successMessage} />
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
