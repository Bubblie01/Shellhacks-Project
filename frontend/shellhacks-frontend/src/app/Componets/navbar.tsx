"use client"
import React from "react";
import '../globals.css';
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
    const { logout } = useAuth0();
    return (
        <div className="relative drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer" className="absolute top-5 left-5 btn btn-primary border-none drawer-button bg-[#7765E3] rounded-3xl w-25 h-20">≡≡</label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-[#4d4092da] text-base-content min-h-full w-80 p-4 shadow-2xl">
                    {/* Sidebar content here */}
                    <p className="text-2xl mt-10 ml-4 font-bold">Placeholder Name</p>
                    <li><a href="../home" className="text-2xl mt-20">Home</a></li>
                    <li><a href="../profile" className="text-2xl mt-10">Profile</a></li>
                    <li><a href="../display" className="text-2xl mt-10">Display(Test)</a></li>
                    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className=" text-2x1 mt-10 bg-black rounded-full">
                    Log Out
                </button>
                </ul>
                
            </div>
        </div>

    );

};

export default Navbar;