

import { useState, useEffect } from 'react';
import ApiClient from '../../../Api/ApiClient';

const PublishedTender = () => {
  // State to store the fetched data
  const [tenderData, setTenderData] = useState([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    ApiClient.get("/admin/tender")
      .then((response) => {
        // console.log("API Response:", response.data); // Log response data
        setTenderData(response.data.data || []); // Update state with API data
      })
      .catch((error) => console.error("API Error:", error)); // Handle errors
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Published Tenders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Tender ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Company Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Tender Section</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
            </tr>
          </thead>
          <tbody>
            {tenderData.length > 0 ? (
              tenderData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{index+1 || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.tender_id || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.name || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.org_company_name || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.tender_section || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.type || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PublishedTender;



