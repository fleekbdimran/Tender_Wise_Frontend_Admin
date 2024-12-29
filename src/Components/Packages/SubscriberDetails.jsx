import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams for dynamic route handling
import Profile from "./Profile/Profile";
import ApiClient from "../../Api/ApiClient"; // Adjust the path based on your setup
import { PHOTO_BASE_URL } from "../../Api/config"; // Ensure correct import path for the config file
import { IoClose } from 'react-icons/io5';

const SubscriberDetails = () => {
  const { id } = useParams(); // Get dynamic ID from route parameters
  const navigate = useNavigate();
  const [subscriberInfo, setSubscriberInfo] = useState({});
  const [packageInfo, setPackageInfo] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({});

  useEffect(() => {
    const fetchSubscriberDetails = async () => {
      try {
        const response = await ApiClient.get(`/admin/package/subscribers/${id}`);
        const data = response.data;

        setSubscriberInfo({
          user_name: data?.data?.user_name || "N/A",
          phone: data?.data?.phone || "N/A",
          email: data?.data?.email || "N/A",
          designation: data?.data?.designation || "N/A",
          Organization_name: data?.data?.organization_name || "N/A",
          address: data?.data?.address || "N/A",
          city: data?.data?.city || "N/A",
          photo: data?.data?.photo || "", // Adding photo URL here
        });

        setPackageInfo({
          package_Id: data?.data?.package_id || "N/A",
          package_Name: data?.data?.package_name || "N/A",
          package_Duration: data?.data?.package_duration || "N/A",
          package_Amount: data?.data?.pay_amount || "N/A",
          package_Start_Time: data?.data?.package_start_date || "N/A",
          package_End_Time: data?.data?.package_expired_date || "N/A",
        });

        setPaymentDetails({
          order_Id: data?.data?.order_id || "N/A",
          transaction_Id: data?.data?.tran_id || "N/A",
          account: data?.data?.acc_number || "N/A",
          customer_Phone_Number: data?.data?.cus_phone_no || "N/A",
          initiate_At: data?.data?.initiate_at || "N/A",
          payment_Status: data?.data?.payment_status || "N/A",
          sp_Order_Id: data?.data?.sp_order_id || "N/A",
          store_Id: data?.data?.store_id || "N/A",
          invoice_No: data?.data?.invoice_no || "N/A",
          payment_Method: data?.data?.method || "N/A",
          payment_Time_Status: data?.data?.payment_time || "N/A",
          status: data?.data?.status || "N/A",
          received_Amount: data?.data?.recived_amount || "N/A",
          card_Holder_Name: data?.data?.card_holder_name || "N/A",
          usd_Rate: data?.data?.usd_rate || "N/A",
          bank_Status: data?.data?.bank_status || "N/A",
          usd_Amount: data?.data?.usd_amount || "N/A",
          discount: data?.data?.discount_amount || "N/A",
        });
      } catch (error) {
        console.error("Error fetching subscriber details:", error);
      }
    };

    if (id) {
      fetchSubscriberDetails(); // Only fetch data if ID is available
    }
  }, [id]); // Add ID as a dependency to re-fetch when it changes

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

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


      {/* Profile Component */}

      <Profile user_name={subscriberInfo.user_name} photo={subscriberInfo.photo} />



      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 space-y-6">


        {/* Subscriber Information */}
        <div className="flex w-full gap-5">
          <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
            <h3 className="text-xl font-semibold mb-4 text-center">Subscriber Information</h3>
            <div className="space-y-4">
              {Object.entries(subscriberInfo).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <p className="font-medium capitalize">{key.replace(/_/g, " ")}:</p>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Package Information */}
          <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
            <h3 className="text-xl font-semibold mb-4 text-center">Package Information</h3>
            <div className="space-y-4">
              {Object.entries(packageInfo).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <p className="font-medium capitalize">{key.replace(/_/g, " ")}:</p>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Transaction Details */}
        <h2 className="text-xl font-bold mb-4 text-center">Payment Transaction Details</h2>
        <div className="flex w-full gap-6">
          {[paymentDetails].map((section, cardIndex) => (
            <React.Fragment key={cardIndex}>
              {/* First Card */}
              <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
                <div className="space-y-4">
                  {Object.entries(section)
                    .slice(0, 9)
                    .map(([key, value], index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <p className="font-medium capitalize">{key.replace(/_/g, " ")}:</p>
                        <p>{value || "N/A"}</p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Second Card */}
              <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
                <div className="space-y-4">
                  {Object.entries(section)
                    .slice(9, 18)
                    .map(([key, value], index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <p className="font-medium capitalize">{key.replace(/_/g, " ")}:</p>
                        <p>{value || "N/A"}</p>
                      </div>
                    ))}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>

  );
};

export default SubscriberDetails;



