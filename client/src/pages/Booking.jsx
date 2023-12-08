import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddressLink from '../components/AddressLink';
import Gallery from '../components/Gallery';
import BookingDates from '../components/BookingDates';

export default function Booking() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get('/bookings').then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return 'Loading...';
  }

  return (
    <div className='my-8'>
      <h1 className='text-3xl'>{booking.property.title}</h1>
      <AddressLink>{booking.property.address}</AddressLink>
      <div className='bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between shadow'>
        <div>
          <h2 className='text-2xl font-semibold mb-4'>Your booking</h2>
          <BookingDates booking={booking} className='mb-2' />
        </div>
        <div className='bg-primary p-6 text-white rounded-2xl'>
          <div>Total Price</div>
          <div className='text-3xl'>£{booking.price}</div>
        </div>
      </div>
      <Gallery property={booking.property} />
    </div>
  );
}
