"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import BASE_URL from '@/app/constants/baseUrl/baseUrl';

const Login = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            // Redirect to another page if the token exists
            router.push('/');
        }
    }, [router]);
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const response = await axios.post(`${BASE_URL}/login`, formData);
            if(response.data.authtoken){
                localStorage.setItem('token', response.data.authtoken); // Save the token to local storage
                setTimeout(()=>{
                    window.location.reload();
                },100)
                router.push('/');
                
            }
            // Handle the response or perform additional actions as needed
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-800 flex items-center justify-center">
            <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-full sm:w-96">
                <h2 className="text-3xl font-bold text-center text-green-500 mb-6">Login</h2> {/* Text color set to vibrant green */}
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            className="w-full rounded-md px-4 py-2 bg-gray-800 text-white"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Your Password"
                            className="w-full rounded-md px-4 py-2 bg-gray-800 text-white"
                            onChange={handleInputChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-600 to-green-400 rounded-md px-4 py-2 text-white font-bold hover:from-green-500 hover:to-green-300" /* Button background set to green with gradient */
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
