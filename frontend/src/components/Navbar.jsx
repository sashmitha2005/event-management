const Navbar = ({setIsLoginModalVisible, isAutheticated, setAuthenticated}) =>{ 

    const LoginEvent = () => {
        setIsLoginModalVisible(true);
    }

    const Signout = () =>{
        setAuthenticated(false);
    }

    return(
        <>
        <div className="flex flex-container h-[5vh] bg-white items-center font-roboto justify-between">
            <div className="text-2xl font-medium">
                Event Management System
            </div>
            {!isAutheticated && <button onClick={LoginEvent} className='h-[5vh] pl-4 pr-4 hover:bg-gray-200 hover:text-gray-800'>Login</button>}
            {isAutheticated && <button onClick={Signout} className='h-[5vh] pl-4 pr-4 hover:bg-gray-200 hover:text-gray-800'>Signout</button>}
            </div>
        </>
    )
}

export default Navbar;