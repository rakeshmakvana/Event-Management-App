import { useContext, useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { BsFillCaretDownFill } from 'react-icons/bs';

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    axios.get("/events")
      .then(response => setEvents(response.data))
      .catch(error => console.error("Error fetching events:", error));
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  async function logout() {
    await axios.post('/auth/logout');
    setUser(null);
    localStorage.removeItem('user');
  }

  return (
    <header className='bg-gradient-to-r from-blue-500 to-blue-700 shadow-md px-6 flex justify-between items-center'>
      <Link to={'/'}>
        <img src="../src/assets/logo.png" alt="Logo" width={100} />
      </Link>

      <nav className='hidden md:flex space-x-8 text-lg text-white'>
        <Link to='/' className='hover:underline'>Home</Link>
        <Link to='/myEvents' className='hover:underline'>My Events</Link>
        <Link to='/createEvent' className='hover:underline'>Create Event</Link>
      </nav>

      <div className='relative'>
        {!!user ? (
          <div className="flex items-center gap-4">
            <Link to={'/'} className='text-white hover:text-yellow-300'>
              <span className='font-semibold'>{user.name.toUpperCase()}</span>
            </Link>
            <BsFillCaretDownFill
              className="h-6 w-6 cursor-pointer text-white hover:text-yellow-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
            {isMenuOpen && (
              <div
                ref={dropdownRef}
                className={`absolute right-0 mt-4 w-48 bg-white rounded-md shadow-lg z-10 transition-all duration-300 ease-out transform ${isMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                <nav className='flex flex-col'>
                  <Link to='/wallet' className='py-2 px-4 text-gray-700 hover:bg-gray-200 transition duration-300'>
                    Wallet
                  </Link>
                  <button
                    onClick={logout}
                    className='py-2 px-4 text-left text-gray-700 hover:bg-gray-200 transition duration-300 w-full'>
                    Log out
                  </button>
                </nav>
              </div>
            )}
          </div>
        ) : (
          <Link to='/login'>
            <button className='bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300'>
              Sign in
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}
