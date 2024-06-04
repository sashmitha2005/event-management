const LoginModal = ({isVisible, onClose, setAuth}) =>{

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
      );
}

export default LoginModal;