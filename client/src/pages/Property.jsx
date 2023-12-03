import { Link, useParams } from 'react-router-dom';
import AccountNav from '../components/AccountNav';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Property() {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    axios.get('/user-properties').then(({ data }) => {
      setProperties(data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className='text-center'>
        <Link
          className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full'
          to={'/account/properties/new'}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 4.5v15m7.5-7.5h-15'
            />
          </svg>
          Create new property
        </Link>
      </div>
      <div className='mx-auto mt-4 flex flex-col gap-4 max-w-3xl'>
        {properties.length > 0 &&
          properties.map((property) => (
            <Link
              key={property._id}
              to={'/account/properties/' + property._id}
              className='flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl'
            >
              <div className='flex w-32 h-32 bg-gray-300 grow shrink-0'>
                {property.photos.length > 0 && (
                  <img
                    className='object-cover'
                    src={'http://localhost:4000/uploads/' + property.photos[0]}
                    alt=''
                  />
                )}
              </div>
              <div className='grow-0 shrink'>
                <h2 className='text-xl font-semibold'>{property.title}</h2>
                <p className='text-sm mt-2'>{property.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
