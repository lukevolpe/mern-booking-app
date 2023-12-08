import { useState } from 'react';

export default function Gallery({ property }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className='absolute inset-0 bg-black text-white min-h-screen'>
        <div className='bg-black p-8 grid gap-4'>
          <div>
            <h2 className='text-3xl mr-48'>Photos of {property.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className='fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black text-black'
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
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
              Close
            </button>
          </div>
          {property?.photos?.length > 0 &&
            property.photos.map((photo) => (
              <div>
                <img src={'http://localhost:4000/uploads/' + photo} alt='' />
              </div>
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className='my-4 relative'>
      <div className='grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden'>
        <div>
          {property.photos?.[0] && (
            <div>
              <img
                onClick={() => setShowAllPhotos(true)}
                className='aspect-square object-cover cursor-pointer'
                src={'http://localhost:4000/uploads/' + property.photos[0]}
                alt={property.title}
              />
            </div>
          )}
        </div>
        <div className='grid'>
          {property.photos?.[1] && (
            <img
              onClick={() => setShowAllPhotos(true)}
              className='aspect-square object-cover cursor-pointer'
              src={'http://localhost:4000/uploads/' + property.photos[1]}
              alt={property.title}
            />
          )}
          {property.photos?.[2] && (
            <div className='overflow-hidden'>
              <img
                onClick={() => setShowAllPhotos(true)}
                className='aspect-square object-cover relative top-2 cursor-pointer'
                src={'http://localhost:4000/uploads/' + property.photos[2]}
                alt={property.title}
              />
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => setShowAllPhotos(true)}
        className='flex gap-1 absolute bottom-2 right-2 py-2 px-4 rounded-2xl bg-white shadow-md shadow-gray-500 hover:bg-opacity-95'
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
            d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
          />
        </svg>
        Show more photos
      </button>
    </div>
  );
}
