import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingWidget from '../components/BookingWidget';
import Gallery from '../components/Gallery';
import AddressLink from '../components/AddressLink';

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/properties/${id}`).then((response) => {
      setProperty(response.data);
    });
  }, [id]);

  if (!property) return 'Loading...';

  return (
    <div className='mt-4 bg-gray-100 -mx-8 px-8 pt-8'>
      <h1 className='text-2xl'>{property.title}</h1>
      <AddressLink>{property.address}</AddressLink>
      <Gallery property={property} />
      <div className='mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]'>
        <div>
          <div className='my-4'>
            <h2 className='font-semibold text-2xl'>Description</h2>
            {property.description}
          </div>
          Check-in: {property.checkIn} <br />
          Check-out: {property.checkOut} <br />
          Max number of guests: {property.maxGuests}
        </div>
        <div>
          <BookingWidget property={property} />
        </div>
      </div>
      <div className='bg-white -mx-8 px-8 py-8 border-t'>
        <div>
          <h2 className='font-semibold text-2xl mt-8'>Extra Info</h2>
        </div>
        <div className='mb-4 mt-1 text-sm text-gray-700 leading-4'>
          {property.extraInfo}
        </div>
      </div>
    </div>
  );
}
