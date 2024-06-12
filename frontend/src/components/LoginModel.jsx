const LoginModal = ({ isVisible, onClose, setAuth }) => {

  if (!isVisible) return null;

  const submitForm = (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      if (username === 'user' && password === 'user') {
          setAuth(true);
          onClose();
      } else {
          alert('Invalid credentials');
      }
  }

  return (
    <>
      <style jsx>{`
        /* Style for the Modal background */
        .fixed {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.5);
        }

        /* Style for the Modal content container */
        .bg-white {
          padding: 24px;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          position: relative;
          background-color: #f0f4f8; /* Light background color */
          font-family: 'Arial, sans-serif'; /* Font style */
        }

        /* Style for the close button */
        .absolute {
          top: 8px;
          right: 8px;
          font-size: 24px;
          cursor: pointer;
        }

        /* Form input styles */
        #myform input {
          border: 2px solid #d1d5db;
          border-radius: 8px;
          margin: 8px 0;
          padding: 12px;
          font-family: 'Arial, sans-serif'; /* Font style */
          color: #333; /* Font color */
        }

        /* Placeholder color */
        #myform input::placeholder {
          color: #888; /* Placeholder color */
        }

        /* Form submit button styles */
        #myform button {
          width: 30%;
          margin: 8px 0;
          padding: 12px;
          border-radius: 8px;
          background-color: #1d4ed8;
          color: white;
          cursor: pointer;
          transition: background-color 0.3s ease;
          font-family: 'Arial, sans-serif'; /* Font style */
        }

        /* Hover effect for the submit button */
        #myform button:hover {
          background-color: #1e40af;
        }
      `}</style>

      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg relative">
          <button onClick={onClose} className="absolute top-2 right-2 text-xl">&times;</button>
          <form id='myform' className='flex flex-col w-[25vw]' onSubmit={submitForm}>
            <input id='username' type='text' placeholder='Enter Username' className='border-2 rounded-lg m-2 p-2' />
            <input id='password' type='password' placeholder='Enter Password' className='border-2 rounded-lg m-2 p-2' />
            <button type='submit' className=' w-[30%] m-2 p-2 rounded-lg bg-blue-700 hover:bg-blue-800'>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginModal;
