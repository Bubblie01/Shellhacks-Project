
export default function Home() {
  return (
    <div className="overflow-hidden w-screen h-screen bg-[url(https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BhY2UlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww)]">
      <div className=" bg-[#0A014F] py-32 my-[25vh] ml-[10%] mr-[10%] rounded-3xl">
        <div className="mx-auto max-w-7xl px-8">
          <div className=" grid  gap-x-8 gap-y-16 mx-0 max-w-none grid-cols-2">
            <div className="pt-4 pr-8">
              <div className="max-w-lg">
                
                <p className="mt-2 font-semibold tracking-tight text-pretty text-white text-5xl">
                  Placeholder Name
                </p>
                <p className="mt-6 text-lg/8 text-gray-300">
                  Planning trips have always been difficult whether it is a day out in the local city
                  or a month long vacation out of country. Place holder name aims to solve that problem
                  by giving the user freedom from doing the hard part of planning. Whether that is budget
                  planning, location research, or even knowing whether it is going to rain or not, Place holder name
                  aims to do all of that for you, all you have to do is say yes or no and sit back and enjoy. Try 
                  it today!
                </p>
                <p className="mt-5 mb-5 font-semibold tracking-tight text-pretty text-white text-3xl">
                  Log in or Register!
                </p>
                <button className=" bg-white text-black border-[#e5e5e5]">
                  <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                  Login with Google
                </button>
              </div>
            </div>
            <img
              alt="Product screenshot"
              src="https://upload.wikimedia.org/wikipedia/commons/7/7f/Rotating_earth_animated_transparent.gif?20201022124448"
              className="w-[500px] max-w-none rounded-xl  ml-40 "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
