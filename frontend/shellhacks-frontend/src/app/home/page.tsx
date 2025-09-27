"use client"
import React, { useState } from 'react';
import Navbar from '../Componets/navbar';
import '../globals.css';

export default function Home() {

   const [inputValue, setInputValue] = useState('');

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="bg-[#0A014F] h-screen ">
       
        <div className=''>
          <div className='absolute top-5 left-5'>
            <Navbar />
            
          </div>

          <iframe className='h-120 w-250 flex mx-auto rounded-full pt-5 mb-5'
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCGlFIC2YyWVZEEGYJbLQMdBujLkLgWkUg
                  &q=United+States">
                    
          </iframe>
          
          <div className='flex justify-center'>
            <p className='text-white'>User Input: {inputValue}</p>
          </div>
          
          <div className='flex justify-center '>

            <input className='bg-gray-500 w-250 ' type="text" value={inputValue} onChange={handleChange} />
          
          </div>
          
        </div>
    </div>
  );
};
