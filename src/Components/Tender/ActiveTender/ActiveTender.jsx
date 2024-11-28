


import { useState, useEffect } from "react";
import ApiClient from "../../../Api/ApiClient";

const ActiveTender = () => {
  const [tenderData, setTenderData] = useState([]); // State to hold API data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const response = await ApiClient.get("/admin/tender");
        // console.log("API Response:", response.data); // Debugging log
        setTenderData(response.data.data || []); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching tenders:", error); // Handle errors
      } finally {
        setLoading(false); // Set loading to false after API call
      }
    };

    fetchTenders(); // Call the function
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Active Tenders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
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
                    <td className="border border-gray-300 px-4 py-2">{index + 1 || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.tender_id || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.title || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.company_name || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.tender_section || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.type || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="border border-gray-300 px-4 py-2 text-center">
                    No tenders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActiveTender;
