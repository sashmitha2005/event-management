import axios from 'axios';

const Modal = ({ isVisible, onClose, event, setEvent}) => {
    if (!isVisible) return null;

    const submitForm = (e) => {
      e.preventDefault();
      
      const form = e.target;
    
        const obj_temp = {
          name: form.eventname.value,
          time: form.time.value,
          venue: form.venue.value,
          date: form.date.value,
          content : form.content.value
        };
    
        axios.post('http://localhost:3000/create_event', obj_temp, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
            const new_obj = {
              _id : response.data._id,
              name: form.eventname.value,
              time: form.time.value,
              venue: form.venue.value,
              date: form.date.value,
              content : form.content.value
            }
            setEvent([...event, new_obj])
            onClose();
          }).catch(err => {
          console.error('Error creating event:', err);
        })
    }

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg relative">
          <button onClick={onClose} className="absolute top-2 right-2 text-xl">&times;</button>
          <form id='myform' className='flex flex-col w-[25vw]' onSubmit={submitForm}>
            <input id='eventname' type='text' placeholder='Enter Event Name' className='border-2 rounded-lg m-2 p-2' />
            <input id='time' type='text' placeholder='Enter Time' className='border-2 rounded-lg m-2 p-2' />
            <input id='venue' type='text' placeholder='Enter Venue' className='border-2 rounded-lg m-2 p-2' />
            <input id='date' type="date" placeholder='Enter Date' className="border-2 w-[30%] rounded-lg m-2 p-1" />
            <textarea id='content' type='text' placeholder='Enter Content' className='border-2 m-2 p-2'/> 
            <button type='submit' className=' w-[30%] m-2 p-2 rounded-lg bg-blue-700 hover:bg-blue-800'>Submit</button>
          </form>
        </div>
      </div>
    );
};

export default Modal;
