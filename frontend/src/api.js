import axios from 'axios';

const API_URL = 'https://project-2-4k65.onrender.com';

export const addID = async (id, data) => {
    try {
        const response = await axios.post(`${API_URL}/add`, { id, data });
        return response.data; // Assuming the backend returns some data
    } catch (error) {
        // Log the full error response for better debugging
        console.error('Error adding ID:', error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data.message : 'Error adding ID');
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
