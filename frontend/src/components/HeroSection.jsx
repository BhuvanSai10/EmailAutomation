import React, { useState } from "react";
import Form from './Form';
import { useSearchParams } from 'react-router-dom';

const HeroSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchParams] = useSearchParams();
  const senderEmail = searchParams.get('senderEmail');

  const handleButtonClick = () => {
    setShowForm(true);
  };

  return (
    <>
      {!showForm && ( 
        <div className='flex flex-col items-center mt-6 lg:mt-30'>
          <h1 className='text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide'>
            Automate Your
            <span className='bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text'>
              {" "} Emails.
            </span>
          </h1>
          <p className='mt-10 text-xl text-center text-neutral-400 max-w-4xl'>
            Effortlessly send personalized emails at scale. Boost engagement,
            nurture leads, and save time with our
            <span className='bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text'>
              {" "} powerful email automation.
            </span>
          </p>
          <button
            className='mt-10 text-2xl bg-orange-500 text-[#E2E8CE] px-4 py-2 rounded hover:bg-amber-700 cursor-pointer'
            onClick={handleButtonClick}
          >
            Try Now!
          </button>
        </div>
      )}

      {showForm && <Form  senderEmail={senderEmail} />}
    </>
  );
};

export default HeroSection;