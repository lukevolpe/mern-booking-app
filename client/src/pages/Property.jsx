import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import PropertyFeatures from '../components/PropertyFeatures';
import PhotosUploader from '../components/PhotosUploader';
import axios from 'axios';

export default function Property() {
  const { action } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirectToPropertiesList, setRedirectToPropertiesList] = useState('');

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

  async function handleCreateProperty(e) {
    e.preventDefault();
    await axios.post('/create-property', {
      title,
      address,
      addedPhotos,
      description,
      features,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    setRedirectToPropertiesList(true);
  }

  if (redirectToPropertiesList && action !== 'new') {
    return <Navigate to={'/account/places'} />;
  }

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
          <form onSubmit={handleCreateProperty}>
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
            <PhotosUploader
              addedPhotos={addedPhotos}
              onChange={setAddedPhotos}
            />
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
                  type='number'
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  placeholder='14'
                />
              </div>
              <div>
                <h3 className='mt-2 -mb-1'>Check-out time</h3>
                <input
                  type='number'
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  placeholder='12'
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
