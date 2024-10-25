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

    // checks for lenght of id
    // if (id.length <=4){
    //   alert('ID must be greater than 4 digits!');

    // }

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

    // checks for lenght of id
    // if (id.length !== 10) {
    //   alert('ID must be exactly 10 digits!');
    //   return;
    // }
    
    // checks for lenght of id
    if (data === '') {
      alert('Data cannot be empty!');
      return;
    }

    try {

      // sending data api.js to addID function where we will recive response from backend
      const result = await addID(id, data);
      setMessage(result.message);
    } catch (error) {
      setMessage(error.message);
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
