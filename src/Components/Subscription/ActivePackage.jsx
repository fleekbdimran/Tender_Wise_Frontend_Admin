


import { useState, useEffect } from "react";
import ApiClient from "../../Api/ApiClient"; // Assuming ApiClient is stored in the mentioned path

const ActivePackage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      setError(null); // Reset error before new fetch

      try {
        const response = await ApiClient.get("/admin/package");
        setPackages(response.data.data); // Assuming the API returns a data field with the list of packages
      } catch (error) {
        setError("Failed to fetch packages.");
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []); // Empty array ensures this effect runs once when the component mounts

  // Filter packages based on search term
  const filteredPackages = packages.filter((pkg) =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPackages = filteredPackages.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by Active Package"
          className="border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-64 px-4 py-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Amount</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Duration</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPackages.map((pkg, index) => (
              <tr key={pkg.id} className="border-t">
                <td className="px-4 py-2 text-sm text-gray-800">
                  {startIndex + index + 1}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">{pkg.name}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{pkg.amount}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{pkg.duration}month</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActivePackage;
