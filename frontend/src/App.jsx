import { useState, useEffect } from 'react'
import axios from 'axios'

import Navbar from './components/Navbar'
import Modal from './components/Modal'
import { EventTile } from './components/EventTile'
import LoginModal from './components/LoginModel'

function App() {
  const [eventData, setEventData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [IsLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isAuthenticated, setAuth] = useState(false);

  const addEvent = () => {
    setIsModalVisible(true);
  }

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const LoginEvent = () => {
    setIsLoginModalVisible(true);
  }

  const toggleLoginModal = () => {
    setIsLoginModalVisible(!IsLoginModalVisible);
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
      <Navbar setIsLoginModalVisible={setIsLoginModalVisible} isAutheticated={isAuthenticated} setAuthenticated={setAuth} setIsEventModalVisible={setIsModalVisible}/>
      <div className='ml-14 p-4 text-5xl mb-10 font-bold'>Event Mangement</div>
      <div className='ml-14'>
        <div className='grid grid-cols-4 grid-auto-cols gap-2'>
          {eventData.map((event, index) =>
            <EventTile object_id={event._id} props={event} key={event._id} events={eventData} setEvents={setEventData} Auth={isAuthenticated} />
          )}
        </div>
      </div>
      <Modal isVisible={isModalVisible} onClose={toggleModal} event={eventData} setEvent={setEventData} />
      <LoginModal isVisible={IsLoginModalVisible} onClose={toggleLoginModal} setAuth={setAuth} />
    </>
  )
}

export default App
//<EventTile props={eventDetails}/>