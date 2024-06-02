import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export const EventTile = ({object_id, props, events, setEvents}) => {

    const deleteElement = async () => {
        const object_del = {
            id: object_id
        }
        try {
            const response = await axios.delete('http://localhost:3000/delete', {
                data: object_del,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                setEvents(events.filter(event => event.id !== object_id));
            }
        } catch(err){
            console.error('Error deleting event:', err);
        }
        console.log("Deleted")
    };
    return (
        <>
            <div className="h-[40vh] shadow-md rounded-lg m-1 border-2 transform transition-all duration-500 hover:scale-102 relative">
                <div className="font-bold text-lg m-1">
                    {props.name}
                </div>
                <hr />
                <div className="flex flex-col m-2 text-2xl">
                    <div>
                        {props.time}
                    </div>
                    <div>
                        {props.venue}
                    </div>
                    <div>
                        {props.date}
                    </div>
                </div>
                <button className='absolute bottom-0 right-0 m-2' onClick={deleteElement}>
                        <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </>
    )
}