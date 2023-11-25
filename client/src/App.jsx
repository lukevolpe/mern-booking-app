import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Layout from './Layout';
import Register from './pages/Register';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import Profile from './pages/Profile';
import Property from './pages/Property';
import PropertyForm from './pages/PropertyForm';
import MyBookings from './pages/MyBookings';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/account' element={<Profile />} />
          <Route path='/account/properties' element={<Property />} />
          <Route path='/account/properties/new' element={<PropertyForm />} />
          <Route path='/account/properties/:id' element={<PropertyForm />} />
          <Route path='/account/bookings' element={<MyBookings />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
