"use client";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Image from "next/image";

export default function Home() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="h-screen w-screen flex bg-gradient-to-bl from-[#6c5ccc] to-[#3251c3]">
      {/* Left panel */}
      <div className="block bg-[#0a014fc3] h-screen w-3/5 border-4 border-solid border-[#0d016dc3] inset-shadow-sm/50 rounded-tr-2xl rounded-br-2xl flex flex-col">
        {/* Carousel */}
        <div
          className="carousel w-[94%] ml-[3%] my-[5%] rounded-2xl overflow-hidden"
          role="region"
          aria-label="Destination gallery"
        >
          <div id="slide1" className="carousel-item relative w-full">
            <img
              src="https://www.travelmanagers.com.au/wp-content/uploads/2025/07/AdobeStock_124584069-lofoten-islands-Norway.jpeg"
              className="w-full object-cover"
              alt="Lofoten Islands, Norway at sunset"
              loading="eager"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a
                href="#slide4"
                className="btn btn-circle hover:shadow-lg transition-shadow duration-300 hover:shadow-white"
                aria-label="Previous image"
              >
                ❮
              </a>
              <a
                href="#slide2"
                className="btn btn-circle hover:shadow-lg transition-shadow duration-300 hover:shadow-white"
                aria-label="Next image"
              >
                ❯
              </a>
            </div>
          </div>

          <div id="slide2" className="carousel-item relative w-full">
            <img
              src="https://media.timeout.com/images/105733228/1372/772/image.webp"
              className="w-full object-cover"
              alt="City skyline at dusk"
              loading="lazy"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a
                href="#slide1"
                className="btn btn-circle hover:shadow-lg transition-shadow duration-300 hover:shadow-white"
                aria-label="Previous image"
              >
                ❮
              </a>
              <a
                href="#slide3"
                className="btn btn-circle hover:shadow-lg transition-shadow duration-300 hover:shadow-white"
                aria-label="Next image"
              >
                ❯
              </a>
            </div>
          </div>

          <div id="slide3" className="carousel-item relative w-full">
            <img
              src="https://www.travelandleisure.com/thmb/L2YwmYMsJRPig8mrYKqmlvaPpvc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/TAL-Disneyland-CAPLACES0323-22e97de241e5447abcf4fbe497263a37.jpg"
              className="w-full object-cover"
              alt="Disneyland castle at night"
              loading="lazy"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a
                href="#slide2"
                className="btn btn-circle hover:shadow-lg transition-shadow duration-300 hover:shadow-white"
                aria-label="Previous image"
              >
                ❮
              </a>
              <a
                href="#slide4"
                className="btn btn-circle hover:shadow-lg transition-shadow duration-300 hover:shadow-white"
                aria-label="Next image"
              >
                ❯
              </a>
            </div>
          </div>

          <div id="slide4" className="carousel-item relative w-full">
            <img
              src="https://i0.wp.com/traveltoyournature.com/wp-content/uploads/2023/07/beautiful-nature-india-1-scaled.jpeg?resize=1536%2C1152&ssl=1"
              className="w-full object-cover"
              alt="Lush green landscape in India"
              loading="lazy"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a
                href="#slide3"
                className="btn btn-circle hover:shadow-lg transition-shadow duration-300 hover:shadow-white"
                aria-label="Previous image"
              >
                ❮
              </a>
              <a
                href="#slide1"
                className="btn btn-circle hover:shadow-lg transition-shadow duration-300 hover:shadow-white"
                aria-label="Next image"
              >
                ❯
              </a>
            </div>
          </div>
        </div>

        <h4
          className="
          ml-10 mt-auto mb-10
          text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl
          font-semibold text-white
        "
        >
          Your time for memories, not logistics.
        </h4>
      </div>

      {/* Right panel */}
      <div className="h-screen w-2/5 text-center py-[10%]">
        {/* Title + Icon (icon to the left of title) */}
        <div className="flex justify-center items-center gap-x-3">
          <Image
            src="/ToureignerIcon.svg"
            alt="Toureigner logo"
            width={50}
            height={50}
            className="object-contain"
            priority
          />
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
            Toureigner
          </p>
        </div>

        <div className="divider mx-[5%]" role="separator" aria-label="divider" />

        <div className="flex flex-col mx-[20%]">
          <button
            type="button"
            onClick={() => loginWithRedirect()}
            className="btn bg-white text-black border-[#e5e5e5] h-20 rounded-xl my-10 text-xl hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 active:scale-[0.99] transition"
          >
            {/* Google Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="45"
              viewBox="0 0 48 48"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            <span className="ml-2">Login with Google</span>
          </button>

          <div className="divider my-10">OR</div>

          <button
            type="button"
            onClick={() => loginWithRedirect()}
            className="btn bg-white text-black border-[#e5e5e5] h-20 rounded-xl my-10 text-xl hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 active:scale-[0.99] transition"
          >
            {/* Google Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,
                4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,
                7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,
                24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,
                5.571l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            <span className="ml-2">Register with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
