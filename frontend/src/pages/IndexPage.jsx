import axios from "axios";
import { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";

export default function IndexPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("/events/allevents")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <div className="container mx-auto p-5 md:p-10">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {events.length > 0 &&
            events.map((event) => (
              <div
                key={event._id}
                className="bg-white shadow-lg rounded-lg transition-transform hover:scale-105 hover:shadow-xl transform duration-300"
              >
                <img
                  src={`http://localhost:4000/${event.image}`}
                  alt={event.title}
                  className="w-full h-60 object-cover"
                />

                <div className="p-5">
                  <h2 className="font-bold text-xl mb-2 text-blue-600">{event.title}</h2>
                  <p className="text-gray-700 mb-4 truncate">{event.description}</p>

                  <div className="text-sm text-gray-500 mb-4">
                    <p>
                      <span className="font-semibold">Date:</span> {event.eventDate.split("T")[0]} <br />
                      <span className="font-semibold">Time:</span> {event.eventTime}
                    </p>
                    <p>
                      <span className="font-semibold">Price:</span>{" "}
                      {event.ticketPrice === 0 ? "Free" : `Rs. ${event.ticketPrice}`}
                    </p>
                  </div>

                  <div className="text-sm text-gray-500 mb-4">
                    <p><span className="font-semibold">Organized By:</span> {event.organizedBy}</p>
                    <p><span className="font-semibold">Created By:</span> {event.owner.toUpperCase()}</p>
                  </div>

                  <button
                    onClick={() => handleViewEvent(event)}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 flex justify-center items-center gap-2 transition-colors"
                  >
                    View Event <BsArrowRightShort className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
        </div>

        {isModalOpen && selectedEvent && (
          <div className="fixed inset-0 flex items-center justify-center bg-transparnt bg-opacity-70">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-blue-600">
                {selectedEvent.title.toUpperCase()}
              </h2>

              <img
                src={`http://localhost:4000/${selectedEvent.image}`} 
                alt={event.title}
                className="w-full h-48 object-cover"
              />

              <p className="text-gray-700 mb-4">{selectedEvent.description}</p>

              <div className="text-sm text-gray-500 mb-4">
                <p>
                  <span className="font-semibold">Date:</span> {selectedEvent.eventDate.split("T")[0]} <br />
                  <span className="font-semibold">Time:</span> {selectedEvent.eventTime}
                </p>
                <p>
                  <span className="font-semibold">Price:</span>{" "}
                  {selectedEvent.ticketPrice === 0 ? "Free" : `Rs. ${selectedEvent.ticketPrice}`}
                </p>
              </div>

              <div className="text-sm text-gray-500 mb-4">
                <p><span className="font-semibold">Organized By:</span> {selectedEvent.organizedBy}</p>
                <p><span className="font-semibold">Created By:</span> {selectedEvent.owner.toUpperCase()}</p>
              </div>

              <button
                onClick={closeModal}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
