// EventTile.js

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import ContentModal from './ContentModal';
import axios from 'axios';

export const EventTile = ({ object_id, props, events, setEvents, Auth }) => {
    const [isContentModalVisible, setContentModalVisible] = useState(false);
    const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
    const [updatedEvent, setUpdatedEvent] = useState({ ...props });

    const openContentModal = () => {
        setContentModalVisible(true);
    }

    const closeContentModal = () => {
        setContentModalVisible(false);
    }

    const openUpdateModal = () => {
        setUpdatedEvent({ ...props });
        setUpdateModalVisible(true);
    }

    const closeUpdateModal = () => {
        setUpdateModalVisible(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedEvent(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleUpdate = () => {
        axios.put(`http://localhost:3000/update_event/${object_id}`, updatedEvent)
            .then(response => {
                if (response.status === 200) {
                    const updatedEvents = events.map(event => {
                        if (event._id === object_id) {
                            return { ...updatedEvent };
                        }
                        return event;
                    });
                    setEvents(updatedEvents);
                    closeUpdateModal();
                }
            })
            .catch(err => {
                console.error('Error updating event:', err);
            });
    }

    const deleteElement = () => {
        const object_del = {
            id: object_id
        }
        axios.delete('http://localhost:3000/delete', {
            data: object_del,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.status === 200) {
                const filtered = events.filter(event => object_id !== event._id);
                setEvents(filtered);
            }
        })
        .catch(err => {
            console.error('Error deleting event:', err);
        });
    };

    return (
        <>
            <div onClick={openContentModal} className="h-[40vh] shadow-md rounded-[20px] border-2 transform transition-all mx-4 mb-2 duration-500 hover:scale-102 relative">
                <div className="font-bold p-5 mb-5 text-2xl rounded-t-[20px] bg-purple-200">
                    {props.name}
                </div>
                <div className="flex flex-col ml-5 text-2xl ">
                    <div className='text-sm font-bold rounded-md'>Time</div>
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
                <div className="absolute bottom-0 right-0 m-2">
                    {Auth && (
                        <>
                            <button onClick={openUpdateModal} className="mr-2">
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button onClick={deleteElement}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </>
                    )}
                </div>
            </div>
            <ContentModal isVisible={isContentModalVisible} onClose={closeContentModal} props={props.content} />

            {isUpdateModalVisible && (
                <div className="fixed inset-0 flex justify-center items-center z-50">
                    <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
                    <div className="bg-white p-8 rounded-lg z-50 w-[400px]">
                        <h2 className="text-2xl font-bold mb-4">Update Event</h2>
                        <input type="text" name="name" value={updatedEvent.name} onChange={handleChange} className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-md" />
                        <input type="text" name="time" value={updatedEvent.time} onChange={handleChange} className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-md" />
                        <input type="text" name="venue" value={updatedEvent.venue} onChange={handleChange} className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-md" />
                        <input type="text" name="date" value={updatedEvent.date} onChange={handleChange} className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-md" />
                        <textarea name="content" value={updatedEvent.content} onChange={handleChange} className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md" />
                        <div className="flex justify-between">
                            <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update</button>
                            <button onClick={closeUpdateModal} className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
