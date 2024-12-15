// packageApi.js

import ApiClient from "../../../Api/ApiClient";

// Fetch Packages
export const fetchPackages = async () => {
  try {
    const response = await ApiClient.get("/admin/package");
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching packages:", error);
    return [];
  }
};

// Create a New Package
export const createPackage = async (formData) => {
  const data = {
    name: formData.name,
    amount: formData.amount,
    duration: formData.duration,
  };

  try {
    const response = await ApiClient.post("/admin/package", data);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error creating package:", error);
    return null;
  }
};

// Update Package
export const updatePackage = async (id, formData) => {
  const data = {
    name: formData.name,
    amount: formData.amount,
    duration: formData.duration,
    status: formData.status,
  };

  try {
    const response = await ApiClient.patch(`/admin/package/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating package:", error);
    return null;
  }
};
