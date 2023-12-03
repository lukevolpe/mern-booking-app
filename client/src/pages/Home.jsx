import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    axios.get('/properties').then((response) => {
      setProperties(response.data);
    });
  }, []);
  return (
    <div className='mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {properties.length > 0 &&
        properties.map((property) => (
          <Link to={'/property/' + property._id}>
            <div className='bg-gray-500 mb-2 rounded-2xl flex'>
              {property.photos?.[0] && (
                <img
                  className='rounded-2xl object-cover aspect-square'
                  src={'http://localhost:4000/uploads/' + property.photos?.[0]}
                  alt={property.title}
                />
              )}
            </div>
            <h2 className='font-bold'>{property.address}</h2>
            <h3 className='text-sm text-gray-500'>{property.title}</h3>
            <div className='mt-1'>
              <span className='font-bold'>£{property.price}</span> / night
            </div>
          </Link>
        ))}
    </div>
  );
}
