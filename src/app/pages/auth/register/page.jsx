"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import BASE_URL from '@/app/constants/baseUrl/baseUrl';

const Register = () => {
    const router = useRouter();
    // defining state variables
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        password: ''
    });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // hiding register route, if user already logged in
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            // Redirect to another page if the token exists
            router.push('/');
        }
    }, [router]);

    // setting up form data
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // making api call - code structre can be improved by making a separate folder for api services
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/register`, formData);

            if (response.data) {
                // Redirect to the login page upon successful registration
                setShowSuccessMessage(true);
                // Hide the success message after 3 seconds
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 1000);
                setTimeout(() => {
                    router.push('/pages/auth/login');
                }, 1500)

            }
        } catch (error) {
            alert (error.response.data.errors[0].msg)
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-800 flex items-center justify-center">
            <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-full sm:w-96">
                <h2 className="text-3xl font-bold text-center text-white mb-6">Register</h2>
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className="w-full rounded-md px-4 py-2 bg-gray-800 text-white"
                            onChange={handleInputChange}
                        />
                    </div>
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
                            type="text"
                            name="phoneNumber"
                            placeholder="Your Phone Number"
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
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-md px-4 py-2 text-white font-bold hover:from-blue-500 hover:to-blue-300"
                    >
                        Register
                    </button>
                </form>
                {showSuccessMessage && (
                    <div >
                        <p className="text-white text-center mt-4 bg-green-500 p-2 rounded">
                            User registered successfully!
                        </p>
                        <p className="text-red text-center mt-4 p-2 rounded">Redirecting to Login Page</p>

                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;