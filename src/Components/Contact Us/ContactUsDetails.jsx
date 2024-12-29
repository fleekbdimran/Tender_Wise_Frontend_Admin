

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiClient from '../../Api/ApiClient'; // Import the ApiClient
import { IoClose } from 'react-icons/io5';

const MessageBox = () => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Extract the message ID from the URL

  const navigate = useNavigate();

  // Fetch the message details when the component is mounted
  const fetchMessage = async () => {
    try {
      setLoading(true);
      const response = await ApiClient.get(`/admin/contact-us/${id}`);
      setMessage(response.data.data); // Access 'data' property to get the actual message data
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch message.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, [id]);

  const handleView = async () => {
    try {
      await ApiClient.patch(`/admin/contact-us/${id}, { status: 1 }`);
      navigate('/contact-us'); // Navigate back to the AllContactUs page
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };


  if (loading) return <div className="flex items-center justify-center min-h-screen text-center">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500 text-center">{error}</div>;

  return (
    <>

      <div className="relative">
        {/* Cross Icon Button */}
        <button
          onClick={handleGoBack}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <IoClose size={24} />
        </button>
      </div>


      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">



        <div className="w-full max-w-lg bg-white p-6 rounded shadow-lg">

          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Contact Us Details</h1>

          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              <strong>Time:</strong> {new Date(message.created_at).toLocaleString()}
            </p>
            <p className="text-gray-800 font-semibold">
              <strong>Name:</strong> <span className="font-normal">{message.name}</span>
            </p>
            <p className="text-gray-800 font-semibold">
              <strong>Email:</strong> <span className="font-normal">{message.email}</span>
            </p>
            <p className="text-gray-800 font-semibold">
              <strong>Phone:</strong> <span className="font-normal">{message.phone}</span>
            </p>
            <p className="text-gray-800 font-semibold">
              <strong>Message:</strong> <span className="font-normal">{message.subject}</span>
            </p>
            {message.message && (
              <p className="text-gray-800 font-semibold">
                <strong>Message:</strong> <span className="font-normal">{message.message}</span>
              </p>
            )}
          </div>
          {message.status === 0 && (
            <button
              onClick={handleView}
              className="w-full bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 mt-6"
            >
              Mark as Viewed
            </button>
          )}
          {message.status === 1 && (
            <p className="text-sm text-gray-500 text-center mt-6">Marked as Viewed</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MessageBox;


