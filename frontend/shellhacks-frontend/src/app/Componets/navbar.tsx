import React from "react";
import '../globals.css';

const Navbar = () => {
    return (

        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Pages</label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li><a href="../home">Home</a></li>
                    <li><a href="../profile">Profile</a></li>
                </ul>
            </div>
        </div>

    );

};

export default Navbar;