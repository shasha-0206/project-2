import { useEffect, useState, useRef } from 'react';
import { getallData } from '../api';
import { gsap } from 'gsap';
import React from 'react';
import axios from 'axios';

const CompleteData = () => {
  const [allData, setAllData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [editMode, setEditMode] = useState(false); // New state to control edit mode
  const [inputValue, setInputValue] = useState(''); // To hold new input data
  const buttonRef = useRef(null); // Ref for the button container

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const result = await getallData();
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

  // for dropdown animations
  useEffect(() => {
    if (showDropdown && buttonRef.current) {
      // Animate dropdown appearing when it's rendered
      gsap.fromTo(buttonRef.current, { height: 0 }, { height: 'auto', duration: 0.3 });
    }
  }, [showDropdown]);

  const handleRowClick = (item) => {
    if (selectedItem && selectedItem._id === item._id) {
      // If the same row is clicked, hide dropdown with animation
      gsap.to(buttonRef.current, { height: 0, duration: 0.3, onComplete: () => {
        setShowDropdown(false); // Hide dropdown after animation
        setSelectedItem(null); // Deselect item
      }});

    } else {
      // Show dropdown with animation
      setSelectedItem(item);
      setShowDropdown(true);
      setEditMode(false); // Exit edit mode if switching between items
    }
  };

  // Enter edit mode
  const handleEdit = (item) => {
    setEditMode(true); // Enable edit mode
    setInputValue(item.data); // Pre-fill input with current data
  };

  // Save the edited value
  const handleSave = async (item) => {
    try {
      const response = await axios.put(`http://localhost:3000/edit/${item.number}`, { data: inputValue });
      console.log('Item edited successfully:', response.data);

      // Update UI with new data
      setAllData(prevData =>
        prevData.map(d => d._id === item._id ? { ...d, data: inputValue } : d)
      );
      
      setEditMode(false); // Exit edit mode after saving
      setShowDropdown(false); // Optionally hide the dropdown
    } catch (error) {
      console.error('Error editing item:', error.message);
    }
  };

  // for deleting
  const handleDelete = async (item) => {
    try {
        const response = await axios.delete(`http://localhost:3000/delete/${item.number}`);

        if (response.status === 200) {
            setAllData(allData.filter(data => data._id !== item._id)); // Update state
        }
    } catch (error) {
        console.error('Error deleting item:', error.message);
    }
  };

  return (
    <>
      {/* Table to Display All Data */}
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
                <tr
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleRowClick(item)} // Add onClick event
                >
                  <th scope="row">{index + 1}</th>
                  <td>{item.number}</td>
                  <td style={{ wordBreak: 'break-word' }}>{item.data}</td>
                  <td>{item.createdAt.toLocaleDateString()}</td>
                </tr>

                {/* Render dropdown container under the row */}
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
