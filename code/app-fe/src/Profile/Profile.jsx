import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Helpers/Header';

function Profile() {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get('http://localhost:5000/profile', { withCredentials: true });
                setUserDetails(response.data.userDetails);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch user details');
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    return (
        <div className="flex-1 p-10 ">
            <Header title="Profile"/>
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl border-4 border-lime-300 mt-12">
                <div className="md:flex">
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-teal-500 font-semibold">User Profile</div>
                        <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{userDetails.name}</h2>
                        <p className="mt-2 text-gray-500">Email: {userDetails.email}</p>
                        <p className="mt-2 text-gray-500">User ID: {userDetails._id}</p>
                        <div className="mt-4">
                            <h3 className="text-md font-semibold text-teal-700">Videos</h3>
                            {userDetails.videos.length > 0 ? (
                                <ul className="list-disc list-inside">
                                    {userDetails.videos.map((video, index) => (
                                        <li key={index} className="text-gray-600">{video}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No videos uploaded yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;