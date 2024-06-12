import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from './components/Navbar';
import Modal from './components/Modal';
import { EventTile } from './components/EventTile';
import LoginModal from './components/LoginModel';

function App() {
  const [eventData, setEventData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [IsLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isAuthenticated, setAuth] = useState(false);

  const addEvent = () => {
    setIsModalVisible(true);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const LoginEvent = () => {
    setIsLoginModalVisible(true);
  };

  const toggleLoginModal = () => {
    setIsLoginModalVisible(!IsLoginModalVisible);
  };

  // Function to update an event
  const updateEvent = (updatedEvent) => {
    // Update the event in the local state
    const updatedEvents = eventData.map(event => {
      if (event._id === updatedEvent._id) {
        return updatedEvent;
      }
      return event;
    });
    setEventData(updatedEvents);

    // Send a PUT request to update the event on the server
    axios.put(`http://localhost:3000/update_event/${updatedEvent._id}`, updatedEvent)
      .then(response => {
        // Handle success if needed
      })
      .catch(error => {
        console.error('Error updating event:', error);
      });
  };

  useEffect(() => {
    axios.post('http://localhost:3000/get_all_events')
      .then(response => {
        setEventData(response.data);
      })
      .catch(err => {
        console.error('Error fetching events:', err);
      });
  }, []);

  return (
    <>
      <div className="min-h-screen" style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/white-background-with-golden-textures_79603-2169.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Navbar setIsLoginModalVisible={setIsLoginModalVisible} isAutheticated={isAuthenticated} setAuthenticated={setAuth} setIsEventModalVisible={setIsModalVisible} />
        <div className="flex justify-center items-center p-4 text-5xl mb-10 font-bold text-black">
          Event Manager
        </div>
        <div className='ml-14'>
          <div className='grid grid-cols-4 gap-2'>
            {eventData.map((event, index) =>
              <EventTile object_id={event._id} props={event} key={event._id} events={eventData} setEvents={setEventData} Auth={isAuthenticated} updateEvent={updateEvent} />
            )}
          </div>
        </div>
        <Modal isVisible={isModalVisible} onClose={toggleModal} event={eventData} setEvent={setEventData} />
        <LoginModal isVisible={IsLoginModalVisible} onClose={toggleLoginModal} setAuth={setAuth} />
      </div>
    </>
  );
}

export default App;
