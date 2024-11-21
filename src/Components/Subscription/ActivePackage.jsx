


import { useState } from "react";

const ActivePackage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const packages = [
    { id: 91, name: "Grand", amount: "Free", duration: "12 months" },
    { id: 90, name: "Rose", amount: "Popular", duration: "6 months" },
  ];

  const filteredPackages = packages.filter((pkg) =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          + Create
        </button>
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
            {filteredPackages.map((pkg) => (
              <tr key={pkg.id} className="border-t">
                <td className="px-4 py-2 text-sm text-gray-800">{pkg.id}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{pkg.name}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{pkg.amount}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{pkg.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="px-3 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          &lt;
        </button>
        <span className="mx-2 px-4 py-1 bg-blue-600 text-white rounded-md">1</span>
        <button
          className="px-3 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ActivePackage;
