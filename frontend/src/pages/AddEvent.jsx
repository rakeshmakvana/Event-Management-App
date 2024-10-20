import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { useParams, useNavigate } from 'react-router-dom';

export default function AddEvent() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    owner: user ? user.name : "",
    title: "",
    description: "",
    organizedBy: "",
    eventDate: "",
    eventTime: "",
    location: "",
    ticketPrice: 0,
    image: null,
  });

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        try {
          const response = await axios.get(`/events/event/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error("Error fetching event:", error);
        }
      };
      fetchEvent();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({ ...prevState, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      if (id) {
        const response = await axios.put(`/events/event/${id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Event updated successfully:", response.data);
      } else {
        const response = await axios.post("/events/createEvent", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Event posted successfully:", response.data);
      }
      navigate('/myevents');
      setFormData({
        owner: user ? user.name : "",
        title: "",
        description: "",
        organizedBy: "",
        eventDate: "",
        eventTime: "",
        location: "",
        ticketPrice: 0,
        image: null,
      });
    } catch (error) {
      console.error("Error submitting event:", error);
    }
  };

  return (
    <div className='max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10'>
      <h1 className='text-4xl font-bold text-center text-gray-800 mb-8'>
        {id ? 'Edit Event' : 'Create New Event'}
      </h1>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col'>
            <label className='text-lg font-semibold'>Title</label>
            <input
              type='text'
              name='title'
              className='mt-1 p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-400'
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-lg font-semibold'>Organized By</label>
            <input
              type='text'
              name='organizedBy'
              className='mt-1 p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-400'
              value={formData.organizedBy}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className='flex flex-col'>
          <label className='text-lg font-semibold'>Description</label>
          <textarea
            name='description'
            className='mt-1 p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-400'
            value={formData.description}
            onChange={handleChange}
            rows='4'
            required
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col'>
            <label className='text-lg font-semibold'>Event Date</label>
            <input
              type='date'
              name='eventDate'
              className='mt-1 p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-400'
              value={formData.eventDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-lg font-semibold'>Event Time</label>
            <input
              type='time'
              name='eventTime'
              className='mt-1 p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-400'
              value={formData.eventTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col'>
            <label className='text-lg font-semibold'>Location</label>
            <input
              type='text'
              name='location'
              className='mt-1 p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-400'
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-lg font-semibold'>Ticket Price</label>
            <input
              type='number'
              name='ticketPrice'
              className='mt-1 p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-400'
              value={formData.ticketPrice}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className='flex flex-col'>
          <label className='text-lg font-semibold'>Upload Event Image</label>
          <input
            type='file'
            name='image'
            className='mt-1 p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-400'
            onChange={handleImageUpload}
            required={!id}
          />
        </div>

        <button
          type='submit'
          className='w-full py-3 mt-5 text-xl font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300'
        >
          {id ? 'Update Event' : 'Create Event'}
        </button>
      </form>
    </div>
  );
}
