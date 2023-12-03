import { useEffect, useState } from 'react';
import PropertyFeatures from '../components/PropertyFeatures';
import PhotosUploader from '../components/PhotosUploader';
import axios from 'axios';
import AccountNav from '../components/AccountNav';
import { Navigate, useParams } from 'react-router-dom';

export default function PropertyForm() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/properties/' + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setFeatures(data.features);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

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

  async function saveProperty(e) {
    e.preventDefault();
    const propertyData = {
      title,
      address,
      addedPhotos,
      description,
      features,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      // update
      await axios.put('/properties', {
        id,
        ...propertyData,
      });
      setRedirect(true);
    } else {
      // new property
      await axios.post('/create-property', propertyData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/account/properties'} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={saveProperty}>
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
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
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
          <div>
            <h2 className='text-xl mt-4'>Pricing</h2>
            <p className='text-gray-500 text-sm'>
              Add the price per night here
            </p>
            <input
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button className='primary my-4'>Save</button>
        </div>
      </form>
    </div>
  );
}
