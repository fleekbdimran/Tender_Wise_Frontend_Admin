// src/Api/SubscriberApi.js

import ApiClient from "../../../Api/ApiClient";

export const fetchSubscribers = async () => {
  try {
    const response = await ApiClient.get("/admin/package/subscribers");
    // console.log("API Response:", response); 
    return response.data; 
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    throw error;
  }
};



