import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlus, faSignOut } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({setIsLoginModalVisible, isAutheticated, setAuthenticated, setIsEventModalVisible}) =>{ 
    const [isNavbarVisible, setNavbarVisible] = useState(false);

    const LoginEvent = () => {
        setIsLoginModalVisible(true);
    }

    const Signout = () => {
        setAuthenticated(false);
    }

    const addEvent = () => {
        setIsEventModalVisible(true);
    }

    return(
        <div className="fixed h-screen w-16" onMouseEnter={() => setNavbarVisible(true)} onMouseLeave={() => setNavbarVisible(false)}>
            {isNavbarVisible && (
                <div className="fixed flex flex-col h-screen w-[50px] bg-gray-100">
                    {isAutheticated && <button className="mt-[120px]" onClick={addEvent}><FontAwesomeIcon icon={faPlus}/></button>}
                    {!isAutheticated && <button onClick={LoginEvent} className='rounded-lg fixed bottom-4 ml-4 text-sm hover:bg-gray-200 hover:text-gray-800'><FontAwesomeIcon icon={faUser} /></button>}
                    {isAutheticated && <button onClick={Signout} className='rounded-lg fixed bottom-4 ml-4 text-sm hover:bg-gray-200 hover:text-gray-800'><FontAwesomeIcon icon={faSignOut}/></button>}
                </div>
            )}
        </div>
    )
}

export default Navbar;