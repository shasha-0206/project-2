import { useRef, useState } from 'react';
import { searchID, addID } from '../api';


const Body = () => {
  const searchRef = useRef(null);
  const dataRef = useRef(null);
  const [message, setMessage] = useState('');
  const [searchResult, setSearchResult] = useState('');
  
  // Handle form submit to search ID
  const handleSearch = async (e) => {
    e.preventDefault();
    const id = searchRef.current.value;

    try {

      // sending data api.js to searchID function where we will recive response from backend
      const result = await searchID(id);
      setSearchResult(result.data); // Update search result state
      setMessage('Search successful!');
    } catch (error) {
      setMessage(error.message);
      setSearchResult(null); // Clear the search result on error
    }

  };

  // Add ID function
  const handleAdd = async (e) => {
    e.preventDefault();
    const id = searchRef.current.value;
    const data = dataRef.current.value;

    // Check for empty data
    if (!data || !id) {
        alert('ID and Data cannot be empty!');
        return;
    }

    try {
        // Sending data to the backend
        const result = await addID(id, data);
        setMessage(result.message); // Assuming your backend sends a message in response
    } catch (error) {
        // Log the error response to see the exact issue
        console.error('Error adding ID:', error.response ? error.response.data : error.message);
        setMessage('Failed to add ID.'); // Display a generic error message to the user
    }
};


  return (
    <>
      <div className="container">
        <h2>Enter Call Number</h2>

        <form onSubmit={handleSearch}>
          <input
            id="idInput"
            ref={searchRef}
            type="text"
            placeholder="Enter call number"
            aria-label="Search"
            required
          />

          <textarea ref={dataRef} type="text" id="dataInput" placeholder="Enter data" />
          <button type="button" onClick={handleAdd}>
            Add ID
          </button>
          {/* Search */}
          <button type="submit">Search ID</button>
        </form>

        {/* Display message and search result conditionally if true then show */}
        {message && <p>{message}</p>}
        {searchResult && (
          <div className='result'>
            <h3>Search Result:</h3>
            <p>Data: {searchResult}</p>
          </div>
        )}

      </div>

    </>
  );
};

export default Body;
