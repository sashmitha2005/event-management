import React, { useState } from 'react';
import axios from 'axios';

const UpdateModal = ({ isVisible, onClose, event, setEvent }) => {
  const [updatedEventData, setUpdatedEventData] = useState({
    name: event.name,
    time: event.time,
    venue: event.venue,
    date: event.date,
    content: event.content
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEventData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/update_event/${event._id}`, updatedEventData);
      setEvent(prevEvents => prevEvents.map(ev => (ev._id === response.data._id ? response.data : ev)));
      onClose();
    } catch (err) {
      console.error('Error updating event:', err);
    }
  };

  return (
    <>
      {isVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Update Event</h2>
            <input type="text" name="name" value={updatedEventData.name} onChange={handleChange} className="mb-4" />
            {/* Add inputs for other event properties */}
            <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded-md">Update</button>
            <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-md ml-4">Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateModal;