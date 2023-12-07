import { useContext, useEffect, useState } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function BookingWidget({ property }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function createBooking() {
    const response = await axios.post('/bookings', {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      property: property._id,
      price: numberOfNights * property.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className='bg-white p-4 rounded-2xl shadow'>
      <div className='text-2xl text-center mb-2'>
        Price: £{property.price} / night
      </div>
      <div className='border rounded-2xl mt-4'>
        <div className='flex'>
          <div className='py-3 px-4 '>
            <label>Check in:</label>
            <input
              type='date'
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className='py-3 px-4 border-t'>
            <label>Check out:</label>
            <input
              type='date'
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className='py-3 px-4 border-t'>
            <label>Number of guests:</label>
            <input
              type='number'
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
            />
          </div>
          {numberOfNights > 0 && (
            <div className='py-3 px-4 border-t'>
              <label>Full name:</label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Mobile number:</label>
              <input
                type='tel'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
      <button onClick={createBooking} className='primary mt-4'>
        Book this property
        {numberOfNights > 0 && (
          <span> for £{numberOfNights * property.price}</span>
        )}
      </button>
    </div>
  );
}
