import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const navigate = useNavigate();
  const text = '( Generate from Google account --> Security -> App passwords -> create new )';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleSignup = async () => {
    setError('');
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, passkey }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/signin');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {

      setError('An error occurred during signup.');
    }
  };

  return (
    <div className="flex flex-col items-center mt-6 lg:mt-10 max-sm:mt-15 m-10">
      <span className="uppercase text-2xl bg-gradient-to-r from-orange-500 to-red-800 text-transparent font-bold bg-clip-text mb-5">
        Create an Account
      </span>
      <form className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-1"
              htmlFor="grid-email"
            >
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-1"
              htmlFor="grid-password"
            >
              Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-1"
              htmlFor="grid-passkey"
            >
              Passkey {text}
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-passkey"
              type="text"
              placeholder="Enter passkey"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
            />
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-col items-center">
        <button
          className="mt-4 mb-5 mr-4 w-40 sm:w-1/3 text-2xl uppercase bg-orange-500 text-[#E2E8CE] px-4 py-2 rounded hover:bg-amber-700 cursor-pointer"
          type="button"
          onClick={handleSignup}
        >
          Sign up
        </button>
        <span className="block uppercase tracking-wide text-s mb-1 max-sm:text-xs">
          Already have an account ?{' '}
        </span>
        <button
          className="mt-4 mb-10 mr-4 w-40 sm:w-1/3 text-2xl uppercase bg-orange-500 text-[#E2E8CE] px-4 py-2 rounded hover:bg-amber-700 cursor-pointer"
          type="button"
          onClick={handleSignIn}
        >
          Sign in
        </button>
      </div>
      </form>
    </div>
  );
};

export default Signup;