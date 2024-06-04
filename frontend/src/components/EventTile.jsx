import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ContentModal from './ContentModal';
import axios from 'axios';

export const EventTile = ({ object_id, props, events, setEvents, Auth }) => {
    const [isContentModalVisible, setContentModalVisible] = useState(false);

    const openContentModal = () => {
        setContentModalVisible(true);
    }

    const closeContentModal = () => {
        setContentModalVisible(false);
    }

    const deleteElement = () => {
        const object_del = {
            id: object_id
        }
        const response = axios.delete('http://localhost:3000/delete', {
            data: object_del,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                const filtered = events.filter(events => object_id !== events._id);
                setEvents(filtered);
            }
        }).catch(err => {
            console.error('Error deleting event:', err);
        })
    };

    return (
        <>
            <div onClick={openContentModal} className="h-[40vh] shadow-md rounded-[20px]  border-2 transform transition-all mx-4 mb-2 duration-500 hover:scale-102 relative">
                <div className="font-bold p-5 mb-5 text-2xl rounded-t-[20px]">
                    {props.name}
                </div>
                <div className="flex flex-col ml-5 text-2xl ">
                    <div className='text-sm font-bold'>Time</div>
                    <div className='mb-4'>
                        {props.time}
                    </div>
                    <div className='text-sm font-bold'>Venue</div>
                    <div className='mb-4'>
                        {props.venue}
                    </div>
                    <div className='text-sm font-bold'>Date</div>
                    <div>
                        {props.date}
                    </div>
                </div>
                {Auth && <button className='absolute bottom-0 right-0 m-2' onClick={deleteElement}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>}
            </div>
            <ContentModal isVisible={isContentModalVisible} onClose={closeContentModal} props={props.content} />
        </>
    )
}