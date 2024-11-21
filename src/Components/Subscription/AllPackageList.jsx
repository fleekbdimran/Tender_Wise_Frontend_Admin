
import { useState } from "react";

const AllPackageList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    duration: "",
  });

  const packages = [
    { id: 91, name: "Grand", amount: "Free", duration: "12 months",Status:"Available" },
    { id: 90, name: "Rose", amount: "Popular", duration: "6 months",Status:"Unavailable" },
  ];

  const filteredPackages = packages.filter((pkg) =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    // Add further submission logic here (e.g., API call)
    setShowCreateForm(false); // Close the form after submission
  };

  return (
    <div className="p-6">
      {/* Conditional rendering of create form or list */}
      {showCreateForm ? (
        <div className="flex items-center justify-center h-screen w-full bg-gray-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-6">Create Package</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="flex flex-col">
                <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="p-4 border border-gray-300 rounded-lg shadow-sm text-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Amount Input */}
              <div className="flex flex-col">
                <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="amount">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="Enter Amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="p-4 border border-gray-300 rounded-lg shadow-sm text-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Duration Input */}
              <div className="flex flex-col">
                <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="duration">
                  Duration (Month)
                </label>
                <input
                  // type="date"
                  // id="duration"
                  // name="duration"
                  // value={formData.duration}
                  onChange={handleChange}
                  className="p-4 border border-gray-300 rounded-lg shadow-sm text-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-auto py-2 px-6 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </div>
            </form>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-3 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              + Create
            </button>
            <input
              type="text"
              placeholder="Search by All PackageList"
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
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredPackages.map((pkg) => (
                  <tr key={pkg.id} className="border-t">
                    <td className="px-4 py-2 text-sm text-gray-800">{pkg.id}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{pkg.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{pkg.amount}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{pkg.duration}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{pkg.Status}</td>
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
        </>
      )}
    </div>
  );
};

export default AllPackageList;

