import React from 'react'
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex justify-center items-center p-2 text-gray-700 h-12 bg-gray-200 shadow-lg rounded-md">
        <div className="flex justify-between items-center w-full">
        <div className="my-auto">
            <p>© 2024 MyBookStore. All Rights Reserved.</p>
        </div>
        <div>
            <ul className="flex justify-center items-center gap-5">
                <Link to="#"><li className="hover:text-gray-500">About</li></Link>
                <Link to="#"><li className="hover:text-gray-500">Privacy Policy</li></Link>
                <Link to="#"><li className="hover:text-gray-500">Refund & Cancellation</li></Link>
                <Link to="#"><li className="hover:text-gray-500">Contact Us</li></Link>
            </ul>
        </div>
        </div>
    </div>
  )
}

export default Footer