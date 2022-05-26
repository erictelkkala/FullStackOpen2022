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
const create = async (newObject) => {
  const request = await axios.post(baseUrl, newObject);
  return request.data;
};

// Delete a person
const remove = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}`);
  return request.data;
};

// Update a person
const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject);
  console.log(request);
  return request.data;
};

// Linting option because the getAll function doesn't have a parameter
//      eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, remove, update };
