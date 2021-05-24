import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="w-full bg-gray-100 border bottom-border">
        <Link className="font-bold text-2xl text-black" to="/">
        Reptifind           
        </Link>
        </div>
    )
}

export default Navbar
