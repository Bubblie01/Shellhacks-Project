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
    <div className="bg-[#0d016dc3]">
       
        <div className=''>
          <div className='sticky top-0'>
            <Navbar />
          </div>
          <div>
            <input type="text" value={inputValue} onChange={handleChange} />
              <p>User Input: {inputValue}</p>
          </div>
            
            <iframe className='h-screen w-screen flex'
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCGlFIC2YyWVZEEGYJbLQMdBujLkLgWkUg
                    &q=United+States">
                      
            </iframe>
            
        </div>
        <h1>Home Page</h1>
    </div>
  );
};
