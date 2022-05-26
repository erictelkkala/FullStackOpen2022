const renderPersons = (persons, removePerson) => {
  const handleDeleteButton = (id, name) => {
    // console.log(name, id);
    removePerson(name, id);
  };

  if (persons.length === 0) {
    return (
      <div>
        <p>No people found</p>
      </div>
    );
  }

  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDeleteButton(person.name, person.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default renderPersons;
