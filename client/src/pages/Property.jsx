import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropertyFeatures from '../components/PropertyFeatures';

export default function Property() {
  const { action } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);

  function inputHeader(text) {
    return <h2 className='text-xl mt-4'>{text}</h2>;
  }

  function inputDescription(text) {
    return <p className='text-gray-500 text-sm'>{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  function addPhotoByLink() {}

  return (
    <div>
      {action !== 'new' && (
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
      )}
      {action === 'new' && (
        <div>
          <form>
            {preInput(
              'Title',
              'The title for your property. This should be short and catchy.'
            )}
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Title e.g. "My apartment"'
            />
            {preInput('Address', 'The address of your property.')}
            <input
              type='text'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder='Address'
            />
            {preInput('Photos', 'The more the better!')}
            <div className='flex gap-2'>
              <input
                type='text'
                value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)}
                placeholder='Add using a link e.g ....jpg'
              />
              <button className='bg-primary px-4 rounded-2xl text-white'>
                Add from URL
              </button>
            </div>
            <div className='mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
              <button className='border bg-transparent rounded-2xl p-8 text-2xl text-gray-600 flex justify-center gap-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-8 h-8'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z'
                  />
                </svg>
                Upload
              </button>
            </div>
            {preInput('Description', 'Add a description of your property.')}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {preInput(
              'Features',
              'Select all the features your property comes with.'
            )}
            <PropertyFeatures selected={features} onChange={setFeatures} />
            {preInput('Extra Information', 'Any specifics, house rules etc.')}
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />
            {preInput(
              'Check in / out Times',
              'Information regarding check-in and out times, as well as max guests.'
            )}
            <div className='grid gap-2 sm:grid-cols-3'>
              <div>
                <h3 className='mt-2 -mb-1'>Check-in time</h3>
                <input
                  type='text'
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  placeholder='14:00'
                />
              </div>
              <div>
                <h3 className='mt-2 -mb-1'>Check-out time</h3>
                <input
                  type='text'
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  placeholder='12:00'
                />
              </div>
              <div>
                <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                <input
                  type='number'
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                  placeholder='5'
                />
              </div>
            </div>
            <div>
              <button className='primary my-4'>Create</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
