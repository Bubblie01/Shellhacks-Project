"use client"
import React, { useState } from 'react';
import Navbar from '../Componets/navbar';
import '../globals.css';
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const { isLoading, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(event.target.value);
  };

  const sendPayload = async() => {
    const res = await fetch(
      "http://localhost:8000/apps/base_agent/users/temp_user_42/sessions/temp_session_42",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`${res.status} ${res.statusText}: ${text}`);
    }
    return res.json();
  };

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated || !user) return;

    (async () => {
      const token = await getAccessTokenSilently();
      console.log(user?.name);
      try{
        const response = await fetch("http://localhost:8000/apps/base_agent/users/temp_user_42/sessions/temp_session_42", {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: "",
        });
        
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }
        const data = await response.json();  // or res.text() if it doesn’t return JSON
        console.log("Session started:", data);
      }
      catch(err){
        console.error("Error starting session:", err);
      }
    })();
  }, [isLoading, isAuthenticated, user, getAccessTokenSilently]);

  return (
    <div className="bg-[#0A014F] h-screen overflow-hidden ">

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
          <p>Character Limit: {inputValue.length}/250</p>
        </div>

        <div className='flex justify-center '>
          {/* text is being saved inside inputValue so we can send it to backend */}
          <textarea id="" className="textarea bg-gray-400 w-250 h-35" maxLength={250} placeholder="Place where you want to vacation here..." value={inputValue} onChange={handleChange}></textarea>

        </div>

        <div className='flex justify-center text-white'>
          <button className="mt-5 btn btn-success btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl" onClick={sendPayload}>Done</button>
          <p>{ }</p>
        </div>
      </div>
    </div>
  );
};
