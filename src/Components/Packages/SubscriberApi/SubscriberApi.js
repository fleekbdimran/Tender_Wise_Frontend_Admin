// src/Api/SubscriberApi.js

import ApiClient from "../../../Api/ApiClient";
const [fromDate, setFromDate] = useState("");
const [toDate, setToDate] = useState("");

export const fetchSubscribers = async () => {
  const fromDate =''
  const toDate =''
  const key =''
  const queryParams = new URLSearchParams();
  queryParams.append('from_date', fromDate || '');
  queryParams.append('to_date', toDate ||'');
  queryParams.append('key', key || '');

  // console.log("quryParams:", queryParams.toString());
  try {
    const response = await ApiClient.get(
      fromDate || toDate || key
      ?`/admin/package/subscribers/?{queryParams}`
      :`/admin/package/subscribers`
    
    );
    // console.log("API Response:", response.data); 
    return response.data; 
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    throw error;
  }
};



