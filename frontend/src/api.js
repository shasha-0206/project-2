import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Your backend URL


export const addID = async (id, data) => {
  try {
    const response = await axios.post(`${API_URL}/add`, { number: id, data });
    return response.data; // Returns the success message
  } catch (error) {
    throw new Error(error.response.data.message || 'Error adding ID');
  }
};

export const searchID = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/search/${id}`);
    return response.data; // Returns the data associated with the ID
  } catch (error) {
    throw new Error(error.response.data.message || 'Error searching for ID');
  }
};

export const getallData = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data; // Returns the data associated with the ID
  } catch (error) {
    throw new Error(error.response.data.message || 'Error searching for ID');
  }
};
