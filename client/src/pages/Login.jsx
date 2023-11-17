import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await axios.post('/login', { email, password });
      alert('Login succesful');
    } catch (error) {
      alert('Login failed');
    }
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Login</h1>
        <form className='max-w-md mx-auto' onSubmit={handleLogin}>
          <input
            type='email'
            placeholder='Enter your email...'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type='password'
            placeholder='Enter your password...'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className='primary'>Login</button>
          <div className='text-center py-2 text-gray-500'>
            Don't have an account?{' '}
            <Link
              className='underline text-black hover:opacity-75'
              to={'/register'}
            >
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
