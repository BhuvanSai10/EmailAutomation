import React from 'react'
import { IoMdMail } from "react-icons/io";
const Navbar = () => {
  
  return (
      <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
        <div className="ml-4 flex items-center hover:cursor-pointer">
            <IoMdMail />
            <span className='ml-2 text-xl font-bold tracking-wide bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text'>
               AUTO MAIL
            </span>
        </div>
      </nav>
  )
}

export default Navbar