import { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import IndexPage from './pages/IndexPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './Layout';
import LoginPage from './pages/LoginPage';
import axios from 'axios';
import { UserContextProvider, UserContext } from './UserContext';
import AddEvent from './pages/AddEvent';
import EventPage from './pages/EventPage';
import TicketPage from './pages/TicketPage';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to='/login' />;
  }
  return children;
}

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<ProtectedRoute><IndexPage /></ProtectedRoute>} />
          <Route path='/createEvent' element={<ProtectedRoute><AddEvent /></ProtectedRoute>} />
          <Route path='/myEvents' element={<ProtectedRoute><EventPage /></ProtectedRoute>} />
          <Route path="/events/event/:id" element={<ProtectedRoute><AddEvent /></ProtectedRoute>} />
          <Route path='/wallet' element={<ProtectedRoute><TicketPage /></ProtectedRoute>} />
        </Route>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
