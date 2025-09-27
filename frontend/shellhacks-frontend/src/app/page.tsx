"use client"
import { useAuth0 } from "@auth0/auth0-react";
import React from 'react';

export default function Home() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="  h-screen w-screen flex bg-linear-to-bl from-[#6c5ccc] to-[#3251c3]">
      <div className="block bg-[#0a014fc3] h-screen w-3/5 border-4 border-solid border-[#0d016dc3] inset-shadow-sm/50 rounded-tr-2xl rounded-br-2xl">
        <div className="carousel w-[94%] ml-[3%] my-[5%] rounded-tr-2xl rounded-br-2xl">
          <div id="slide1" className="carousel-item relative w-full">
            <img
              src="https://www.travelmanagers.com.au/wp-content/uploads/2025/07/AdobeStock_124584069-lofoten-islands-Norway.jpeg"
              className="w-full" />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide4" className="btn btn-circle hover:shadow-lg transition-shadow duration-300 hover:shadow-white">❮</a>
              <a href="#slide2" className="btn btn-circle hover:shadow-lg transition-shadow duration-300 hover:shadow-white">❯</a>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <img
              src="https://media.timeout.com/images/105733228/1372/772/image.webp"
              className="w-full" />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide1" className="btn btn-circle hover:shadow-lg transition-shadow duration-300 hover:shadow-white">❮</a>
              <a href="#slide3" className="btn btn-circle hover:shadow-lg transition-shadow duration-300 hover:shadow-white">❯</a>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <img
              src="https://www.travelandleisure.com/thmb/L2YwmYMsJRPig8mrYKqmlvaPpvc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/TAL-Disneyland-CAPLACES0323-22e97de241e5447abcf4fbe497263a37.jpg"
              className="w-full" />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide2" className="btn btn-circle hover:shadow-lg transition-shadow duration-300 hover:shadow-white">❮</a>
              <a href="#slide4" className="btn btn-circle hover:shadow-lg transition-shadow duration-300 hover:shadow-white">❯</a>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full">
            <img
              src="https://i0.wp.com/traveltoyournature.com/wp-content/uploads/2023/07/beautiful-nature-india-1-scaled.jpeg?resize=1536%2C1152&ssl=1"
              className="w-full" />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide3" className="btn btn-circle hover:shadow-lg transition-shadow duration-300 hover:shadow-white">❮</a>
              <a href="#slide1" className="btn btn-circle hover:shadow-lg transition-shadow duration-300 hover:shadow-white">❯</a>
            </div>
          </div>
        </div>
        <h4 className="
          absolute bottom-10 left-10 
          text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 
          font-semibold text-white
        ">Your time for memories, not logistics.</h4>
      </div>
      <div className="h-screen w-2/5 text-center py-[10%]">
        <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
          Name Place Holder
        </p>
        <div className="divider mx-[5%]"></div>
        <div className="flex flex-col mx-[20%]">
          <button onClick={() => loginWithRedirect()} className="btn bg-white text-black border-[#e5e5e5] h-20 rounded-xl my-10 text-xl hover:bg-blue-200 focus:outline-2 focus:outline-offset-2 focus:black active:bg-blue-700">
            <svg aria-label="Google logo" width="48" height="48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Login with Google
          </button>
          <div className="divider my-10">OR</div>
          <button onClick={() => loginWithRedirect()} className="btn bg-white text-black border-[#e5e5e5] h-20 rounded-xl my-10 text-xl hover:bg-blue-200 focus:outline-2 focus:outline-offset-2 focus:black active:bg-blue-700">
            <svg aria-label="Google logo" width="48" height="48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Register with Google
          </button>
        </div>
      </div>
    </div>
  );
}
