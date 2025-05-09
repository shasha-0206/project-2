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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600">
          <h2 className="text-3xl font-bold text-white text-center">
            Call Number Management
          </h2>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label 
                htmlFor="idInput"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Call Number
              </label>
              <input
                id="idInput"
                ref={searchRef}
                type="text"
                placeholder="Enter call number"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                required
              />
            </div>

            <div>
              <label 
                htmlFor="dataInput"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Data
              </label>
              <textarea
                ref={dataRef}
                id="dataInput"
                placeholder="Enter data"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 min-h-[120px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleAdd}
                className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-200 transition duration-200 font-medium"
              >
                Add ID
              </button>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition duration-200 font-medium"
              >
                Search ID
              </button>
            </div>
          </form>

          {message && (
            <div className={`mt-6 p-4 rounded-lg ${
              message.includes('successful') 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              <p className="text-center font-medium">{message}</p>
            </div>
          )}

          {searchResult && (
            <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Search Result
              </h3>
              <p className="text-gray-700 whitespace-pre-wrap break-words">
                {searchResult}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;