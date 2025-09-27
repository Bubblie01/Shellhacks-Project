import React from "react";
import '../globals.css';

const Navbar = () => {
    return (

        <div className="relative drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer" className="absolute top-0 left-0 btn btn-primary border-none drawer-button bg-[#0000009e] rounded-br-2xl w-25 h-20">≡≡</label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-[#151515ea] text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <p className="text-2xl mt-10 ml-4 font-bold">Placeholder Name</p>
                    <li><a href="../home" className="text-2xl mt-20">Home</a></li>
                    <li><a href="../profile" className="text-2xl mt-10">Profile</a></li>
                </ul>
            </div>
        </div>

    );

};

export default Navbar;