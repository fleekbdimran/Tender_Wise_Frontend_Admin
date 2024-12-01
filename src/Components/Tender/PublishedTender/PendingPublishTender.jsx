
import { useEffect, useState } from 'react';
import ApiClient from '../../../Api/ApiClient';

const PendingPublishTender = () => {
  const [data, setData] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch tenders from the API
  const fetchTenders = async () => {
    try {
      const response = await ApiClient.get('/admin/tender/publish-tender?status=in_review');
      // console.log('API Response:', response.data);

      if (response.data && Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        setError('Unexpected API response format.');
      }
    } catch (err) {
      // console.error('Error fetching tenders:', err);
      setError('Failed to fetch tenders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchTenders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Pending Tender</h2>

      {loading && <p className="text-gray-600">Loading tenders...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200 text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2">ID</th>
                <th className="border border-gray-200 px-4 py-2">Name</th>
              
                <th className="border border-gray-200 px-4 py-2">Organization Name</th>
                <th className="border border-gray-200 px-4 py-2">Phone</th>
                <th className="border border-gray-200 px-4 py-2">Tender Name</th>
                
                <th className="border border-gray-200 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id || Math.random()} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-200 px-4 py-2">{item.name || 'N/A'}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    {item.organization_name || "N/A"} {/* Correctly using tender_name */}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">{item.phone || 'N/A'}</td>
                  <td className="border border-gray-200 px-4 py-2">{item.tender_name || 'N/A'}</td>
                  
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    <button className="text-gray-600 hover:text-gray-800">
                      👁
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p className="text-gray-600">No tenders found.</p>
      )}
    </div>
  );
};

export default PendingPublishTender;
