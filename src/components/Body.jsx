import { useRef, useState } from 'react';
import { searchID, addID } from '../api';

const Body = () => {
  const searchRef = useRef(null);
  const dataRef = useRef(null);
  const [message, setMessage] = useState('');
  const [searchResult, setSearchResult] = useState('');
  
  const handleSearch = async (e) => {
    e.preventDefault();
    const id = searchRef.current.value;

    try {
      const result = await searchID(id);
      setSearchResult(result.data);
      setMessage('Search successful!');
    } catch (error) {
      setMessage(error.message);
      setSearchResult(null);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const id = searchRef.current.value;
    const data = dataRef.current.value;

    if (!data || !id) {
      alert('ID and Data cannot be empty!');
      return;
    }

    try {
      const result = await addID(id, data);
      setMessage(result.message);
    } catch (error) {
      console.error('Error adding ID:', error.response ? error.response.data : error.message);
      setMessage('Failed to add ID.');
    }
  };

  return (
    <div className="body-container">
      <div className="form-container">
        <h2 className="title">Call Number Management</h2>

        <form onSubmit={handleSearch} className="input-form">
          <div className="input-group">
            <label htmlFor="idInput">Call Number</label>
            <input
              id="idInput"
              ref={searchRef}
              type="text"
              placeholder="Enter call number"
              aria-label="Search"
              required
              className="form-input"
            />
          </div>

          <div className="input-group">
            <label htmlFor="dataInput">Data</label>
            <textarea 
              ref={dataRef} 
              id="dataInput" 
              placeholder="Enter data"
              className="form-textarea"
            />
          </div>

          <div className="button-group">
            <button type="button" onClick={handleAdd} className="add-button">
              Add ID
            </button>
            <button type="submit" className="search-button">
              Search ID
            </button>
          </div>
        </form>

        {message && <p className={`message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</p>}
        
        {searchResult && (
          <div className="result-container">
            <h3>Search Result:</h3>
            <p className="result-data">{searchResult}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;