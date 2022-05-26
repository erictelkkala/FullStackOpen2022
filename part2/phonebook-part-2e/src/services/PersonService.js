import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
  const request = await axios
    .get(baseUrl)
    .then((response) => response.data)
    .catch((error) => {
      // If the request fails, display the error in console
      console.log(error);
    });

  return request;
};

// Create a new person
const create = async (newObject, setSuccess, setError) => {
  const request = await axios
    .post(baseUrl, newObject)
    .then((response) => {
      // Set the success message
      setSuccess(`Added ${response.data.name}`);
      // Remove the notification after 5 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
      return response.data;
    })

    .catch((error) => {
      // If the request fails, display the error in console
      console.log(error);
      // Set the error message
      setError(error.message);
      // Remove the notification after 5 seconds
      setTimeout(() => {
        setError(null);
      }, 5000);
    });
  return request;
};

// Delete a person
const remove = async (id, name, setSuccess, setError) => {
  const request = await axios
    .delete(`${baseUrl}/${id}`)
    .then((response) => {
      // Set the success message
      setSuccess(`Deleted ${name}`);
      // Remove the notification after 5 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
      return response.data;
    })
    .catch((error) => {
      // If the request can't find the person, display that the person has been deleted already
      if (error.response.status === 404) {
        setError(
          `Information of ${name} has already been removed from the server`
        );
      } else {
        // Set the error message
        setError(error.message);
      }
      // Remove the notification after 5 seconds
      setTimeout(() => {
        setError(null);
      }, 5000);
      return error;
    });
  return request;
};

// Update a person
const update = async (id, newObject, setSuccess, setError) => {
  const request = await axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => {
      console.log(response);
      setSuccess(`Updated ${response.data.name}`);
      // Remove the notification after 5 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
      return response.data;
    })
    .catch((error) => {
      // If the request can't find the person, display that the person has been deleted already
      if (error.response.status === 404) {
        setError(
          `Information of ${newObject.name} has already been removed from the server`
        );
      } else {
        // Set the error message
        setError(error.message);
      }
      // Remove the notification after 5 seconds
      setTimeout(() => {
        setError(null);
      }, 5000);
    });
  return request;
};

// Linting option because the getAll function doesn't have a parameter
//      eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, remove, update };
