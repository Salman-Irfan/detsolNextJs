"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import BASE_URL from '@/app/constants/baseUrl/baseUrl';

const AddCarForm = () => {
    const router = useRouter();
    
    const token =  localStorage.getItem('token');
    
    useEffect(() => {
        if (!token) {
            router.push('/pages/auth/login');
        }
    }, [router, token]);
    
    const [notification, setNotification] = useState(null);
    const [carData, setCarData] = useState({
        model: '',
        price: '',
        phoneNumber: '',
        city: '', 
        noOfCopies: '',
        carImages: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCarData({ ...carData, [name]: value });
    };

    const handleImageChange = (e) => {
        setCarData({ ...carData, carImages: e.target.files[0] });
    };

    const clearForm = () => {
        setCarData({
            model: '',
            price: '',
            phoneNumber: '',
            city: '',
            noOfCopies: '',
            carImages: null,
        });
    };

    const showToast = (message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification(null);
        }, 1000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('model', carData.model);
        formData.append('price', carData.price);
        formData.append('phoneNumber', carData.phoneNumber);
        formData.append('city', carData.city);
        formData.append('noOfCopies', carData.noOfCopies);
        formData.append('carImages', carData.carImages);

        try {
            
            const response = await axios.post(`${BASE_URL}/cars`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            clearForm();
            showToast('Car successfully added!');
        } catch (error) {
            showToast('Error adding car. Please try again.');
            alert(error.response.data.errors[0].msg);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-600 to-gray-900">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 rounded-lg p-8 shadow-lg">
                <h1 className="text-white text-3xl mb-4 text-center">Add Car for Rent</h1>
                {notification && (
                    <div className="mb-4 bg-green-500 text-white p-2 text-center rounded">
                        {notification}
                    </div>
                )}
                <div className="flex flex-col space-y-2 text-white">
                    <label htmlFor="model" className="text-white">Car Model</label>
                    <input
                        type="text"
                        name="model"
                        value={carData.model}
                        onChange={handleInputChange}
                        placeholder="Enter car model"
                        className="text-black bg-gray-200 rounded border-2 border-gray-500 focus:border-blue-500 focus:outline-none p-2"
                    />
                    <label htmlFor="price" className="text-white">Car Price</label>
                    <input
                        type="number"
                        name="price"
                        value={carData.price}
                        onChange={handleInputChange}
                        placeholder="Enter car price"
                        className="text-black bg-gray-200 rounded border-2 border-gray-500 focus:border-blue-500 focus:outline-none p-2"
                    />
                    <label htmlFor="phoneNumber" className="text-white">Phone Number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={carData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                        className="text-black bg-gray-200 rounded border-2 border-gray-500 focus:border-blue-500 focus:outline-none p-2"
                    />
                    <label className="text-white">City</label>
                    <div>
                        <label className="text-white">
                            <input
                                type="radio"
                                name="city"
                                value="lahore"
                                onChange={handleInputChange}
                                className="mr-1"
                            />
                            Lahore
                        </label>
                        <label className="text-white ml-4">
                            <input
                                type="radio"
                                name="city"
                                value="karachi"
                                onChange={handleInputChange}
                                className="mr-1"
                            />
                            Karachi
                        </label>
                    </div>
                    <label htmlFor="noOfCopies" className="text-white">Number of Copies</label>
                    <input
                        type="number"
                        name="noOfCopies"
                        value={carData.noOfCopies}
                        onChange={handleInputChange}
                        placeholder="Enter number of copies"
                        className="text-black bg-gray-200 rounded border-2 border-gray-500 focus:border-blue-500 focus:outline-none p-2"
                    />
                    <label htmlFor="carImages" className="text-white">Upload Car Picture</label>
                    <input
                        type="file"
                        name="carImages"
                        onChange={handleImageChange}
                        className="input-style"
                    />
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Car
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCarForm;
