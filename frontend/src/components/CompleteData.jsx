import { useEffect, useState, useRef } from 'react';
import { getallData } from '../api'; // Ensure this uses the new backend URL if it fetches from the backend
import { gsap } from 'gsap';
import React from 'react';
import axios from 'axios';

const CompleteData = () => {
  const [allData, setAllData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const buttonRef = useRef(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const result = await getallData(); // Ensure this is updated in api.js
        const formattedData = result.map(item => ({
          ...item,
          createdAt: new Date(item.createdAt),
        }));
        setAllData(formattedData);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    if (showDropdown && buttonRef.current) {
      gsap.fromTo(buttonRef.current, { height: 0 }, { height: 'auto', duration: 0.3 });
    }
  }, [showDropdown]);

  const handleRowClick = (item) => {
    if (selectedItem && selectedItem._id === item._id) {
      gsap.to(buttonRef.current, { height: 0, duration: 0.3, onComplete: () => {
        setShowDropdown(false);
        setSelectedItem(null);
      }});
    } else {
      setSelectedItem(item);
      setShowDropdown(true);
      setEditMode(false);
    }
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setInputValue(item.data);
  };

  const handleSave = async (item) => {
    try {
      const response = await axios.put(`https://project-2-4k65.onrender.com/edit/${item.number}`, { data: inputValue });
      setAllData(prevData => prevData.map(d => d._id === item._id ? { ...d, data: inputValue } : d));
      setEditMode(false);
      setShowDropdown(false);
    } catch (error) {
      console.error('Error editing item:', error.message);
    }
  };

  const handleDelete = async (item) => {
    try {
      const response = await axios.delete(`https://project-2-4k65.onrender.com/delete/${item.number}`);

      if (response.status === 200) {
          setAllData(allData.filter(data => data._id !== item._id));
      }
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  };

  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Data</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {allData.map((item, index) => (
            item.number && item.data ? (
              <React.Fragment key={item._id}>
                <tr style={{ cursor: 'pointer' }} onClick={() => handleRowClick(item)}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.number}</td>
                  <td style={{ wordBreak: 'break-word' }}>{item.data}</td>
                  <td>{item.createdAt.toLocaleDateString()}</td>
                </tr>

                {showDropdown && selectedItem && selectedItem._id === item._id && (
                  <tr>
                    <td colSpan="4">
                      <div ref={buttonRef} style={{ overflow: 'hidden' }}>
                        {editMode ? (
                          <>
                            <input
                              type="text"
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              style={{ width: '200px' }}
                            />
                            <button
                              style={{ width: '100px', marginLeft: '10px' }}
                              onClick={() => handleSave(selectedItem)}
                            >
                              Save
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              style={{ width: '100px', marginLeft: '10px' }}
                              onClick={() => handleEdit(selectedItem)}
                            >
                              Edit
                            </button>
                            <button
                              id="del"
                              style={{ backgroundColor: 'red', width: '100px', marginLeft: '10px' }}
                              onClick={() => handleDelete(selectedItem)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ) : null
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CompleteData;
