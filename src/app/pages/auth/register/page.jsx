"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import BASE_URL from '@/app/constants/baseUrl/baseUrl';
import postApiService from '@/app/services/apiServices/postApiService';
import API_END_POINTS from '@/app/constants/apiEndPoints/apiEndPoints';

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
    const [showPassword, setShowPassword] = useState(false);
    // if user has login token, redirect to home page
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            router.push('/');
        }
    }, [router]);
    // setting form data
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    // making api call, code structure can be more improved by making a separate folder of api services 
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            // when i call my api call directly in the component, then error messages are perfectly working.
            // but when calling my api call from api services, then error messages are not working properly on the console too, 
            // first they will printed on console, then i can pass in allert box

            // const response = await axios.post(`${BASE_URL}/register`, formData);
            const response = await postApiService(formData, API_END_POINTS.REGISTER_USER)

            if (response.message) {
                setShowSuccessMessage(true);
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 1000);
                setTimeout(() => {
                    router.push('/pages/auth/login');
                }, 1500);
            }
        } catch (error) {
            console.log(error) // and simply printing the error, that i getting from service
            alert(error.response.data.errors[0].msg)
            // i commented the alert box
            // alert(error.response.data.errors[0].msg);
        }
    };
    // show / hide password
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Your Password"
                                className="w-full rounded-md px-4 py-2 bg-gray-800 text-white"
                                onChange={handleInputChange}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute top-3 right-3 text-gray-400"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-md px-4 py-2 text-white font-bold hover:from-blue-500 hover:to-blue-300"
                    >
                        Register
                    </button>
                </form>
                {showSuccessMessage && (
                    <div>
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
