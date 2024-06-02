import { useState, useEffect } from 'react'
import axios from 'axios'

import Navbar from './components/Navbar'
import Modal from './components/Modal'
import { EventTile } from './components/EventTile'

const eventDetails = {
  name: 'Event 1',
  time: '10:00pm - 11:00pm',
  venue: 'Sample Venue',
  date: '01-01-1973'
}

function App() {
  const [event, setEvent] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const addEvent = () => {
    setIsModalVisible(true);
  }

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    axios.post('http://localhost:3000/get_all_events')
      .then(response => {
          const newEvents = response.data.map((eventData,index) => <EventTile object_id={eventData._id} props={eventData} key={eventData._id} events={event} setEvents={setEvent}/>);
          setEvent(newEvents);
      }
      )
      .catch(err => {
        console.error('Error fetching events:', err);
      });
  }, [event]);

  return (
    <>
      <Navbar />
      <button className='p-2 border-2 rounded-lg m-4' onClick={addEvent}>Add Event</button>
      <div className='h-[50vh] w-[98wv] m-2'>
        <div className='grid grid-cols-4 grid-auto-cols gap-2'>
          {event}
        </div>
      </div>
      <Modal isVisible={isModalVisible} onClose={toggleModal} event={event} setEvent={setEvent} />
    </>
  )
}

export default App
//<EventTile props={eventDetails}/>