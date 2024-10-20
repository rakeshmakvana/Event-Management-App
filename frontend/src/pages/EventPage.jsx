import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function MyEvent() {
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/events/allevents');
        const userEvents = response.data.filter(event => event.owner === user.name);
        setEvents(userEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [user]);

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`/events/event/${eventId}`);
        setEvents(events.filter((event) => event._id !== eventId));
        alert('Event deleted successfully.');
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  return (
    <div className='container mx-auto p-5 md:p-10'>
      {events.length === 0 ? (
        <p className='text-center text-gray-500'>No events found.</p>
      ) : (
        <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
          {events.map((event) => (
            <div key={event._id} className='bg-white shadow-lg rounded-lg transition-transform hover:scale-105 hover:shadow-xl transform duration-300'>
              <img
                src={`http://localhost:4000/${event.image}`}
                alt={event.title}
                className='w-full h-60 object-cover rounded-t-lg'
              />
              <div className='p-4'>
                <h2 className='text-2xl font-bold text-gray-800 mb-2'>{event.title}</h2>
                <p className='text-gray-600 mb-4'>{event.description}</p>
                <div className='text-gray-500 mb-2'>
                  <strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}
                </div>
                <div className='text-gray-500 mb-2'>
                  <strong>Time:</strong> {event.eventTime}
                </div>
                <div className='text-gray-500 mb-4'>
                  <strong>Location:</strong> {event.location}
                </div>
                <div className='flex justify-between items-center'>
                  <Link
                    to={`/events/event/${event._id}`}
                    className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200'
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200'
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
