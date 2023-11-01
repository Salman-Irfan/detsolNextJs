"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken || '');
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken('');
        window.location.reload()
    };


    return (
        <nav className="bg-gray-800 p-4">
            <div className="flex flex-wrap items-center justify-between">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <Link href={"/"} className="text-white hover:text-gray-300">
                        <span className="font-semibold text-xl">Car Rental App</span>
                    </Link>
                </div>
                <div className="w-full flex-grow md:w-auto md:flex md:items-center md:w-1/2">
                    <ul className="flex items-center justify-between">
                        <li className="ml-4">
                            <Link href={"/"} className="text-white hover:text-gray-300">Home</Link>
                        </li>
                    </ul>
                </div>
                <div className="w-full md:w-auto md:flex md:items-center">
                    {token ? (
                        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4 mb-2 md:mb-0">
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link href={"/pages/auth/login"}>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4 mb-2 md:mb-0">
                                    Login
                                </button>
                            </Link>
                            <Link href={"/pages/auth/register"}>
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4">
                                    Register
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
