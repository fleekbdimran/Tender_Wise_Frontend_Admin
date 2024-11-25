
import React, { useState } from "react";
import Swal from "sweetalert2";
import ApiClient from "../../Api/ApiClient"; // Import ApiClient instance

const CreatePackage = () => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    duration: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      amount: formData.amount,
      duration: formData.duration,
    };

    try {
      // Sending API request
      const response = await ApiClient.post("/admin/package", payload);

      console.log("API Response:", response); // Debug the response

      // Check if the API response status indicates success
      if (response.status === 200 || response.status === 201) {
        // SweetAlert success message
        await Swal.fire({
          title: "Success!",
          text: "Package created successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });

        // Reset form fields
        setFormData({ name: "", amount: "", duration: "" });
      } else {
        // Fallback error message
        Swal.fire({
          title: "Error!",
          text: response.data.message || "Something went wrong!",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.error("Error in API Call:", error); // Debugging the error
      // SweetAlert error message for exceptions
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-6">Create Package</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="flex flex-col">
            <label
              className="block text-lg font-medium text-gray-700 mb-2"
              htmlFor="name"
            >
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
            <label
              className="block text-lg font-medium text-gray-700 mb-2"
              htmlFor="amount"
            >
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
            <label
              className="block text-lg font-medium text-gray-700 mb-2"
              htmlFor="duration"
            >
              Duration (Months)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              placeholder="Enter Duration"
              value={formData.duration}
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
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePackage;
