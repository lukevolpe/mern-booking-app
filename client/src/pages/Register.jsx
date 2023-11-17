import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await axios.post('/register', {
        name,
        email,
        password,
      });
      alert('Registration successful. Now you can log in.');
    } catch (error) {
      alert('Registration failed. Please try again later.');
    }
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Register</h1>
        <form className='max-w-md mx-auto' onSubmit={handleRegister}>
          <input
            type='text'
            placeholder='Enter your name...'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='email'
            placeholder='Enter your email...'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Enter your password...'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='primary'>Register</button>
          <div className='text-center py-2 text-gray-500'>
            Already have an account?{' '}
            <Link
              className='underline text-black hover:opacity-75'
              to={'/login'}
            >
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
