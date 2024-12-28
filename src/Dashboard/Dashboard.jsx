import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState({
    liveTenders: 0,
    corrigendum: 0,
    privateTenders: 0,
    publishToday: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch(`${API_BASE_URL}/admin/summary-view/live`), 
          fetch(`${API_BASE_URL}/admin/summary-view/private`),
          fetch(`${API_BASE_URL}/admin/summary-view/corrigendum`),
          fetch(`${API_BASE_URL}/admin/summary-view/publish-today?from_date&to_date`),
        ]);
        const results = await Promise.all(responses.map((res) => res.json()));

        setData({
          liveTenders: results[0].total_live_tender || 0, 
          corrigendum: results[1].total_private || 0,
          privateTenders: results[2].total_corrigendum || 0,
          publishToday: results[3].total_publish_today || 0,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-bold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <Card
        icon="https://img.icons8.com/ios-filled/50/007bff/radio-waves.png"
        count={data.liveTenders}
        title="Live Tenders"
      />
      <Card
        icon="https://img.icons8.com/ios-filled/50/007bff/external-link.png"
        count={data.corrigendum}
        title="Corrigendum"
      />
      <Card
        icon="https://img.icons8.com/ios-filled/50/007bff/lock-2.png"
        count={data.privateTenders}
        title="Private Tenders"
      />
      <Card
        icon="https://img.icons8.com/ios-filled/50/007bff/document.png"
        count={data.publishToday}
        title="Publish Today"
      />
    </div>
  );
};

const Card = ({ icon, count, title }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center hover:scale-105 transition-transform duration-300">
      <div className="flex justify-around mb-4">
        <img src={icon} alt={title} className="h-10 w-10" />
      </div>
      {/* Custom Animated Counter */}
      <AnimatedCounter count={count} />

      
      <p className="text-gray-600">{title}</p>
    </div>
  );
};

// Custom Animated Counter Component
const AnimatedCounter = ({ count }) => {
  const [currentCount, setCurrentCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = count;
    const duration = 500; // 0.5 seconds for animation
    const increment = end / (duration / 50); // Increment per interval

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(interval);
        setCurrentCount(end);
      } else {
        setCurrentCount(Math.floor(start));
      }
    }, 50);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <p className="text-3xl font-bold text-blue-600">
      {currentCount.toLocaleString()}
    </p>
  );
};

export default Dashboard;



// import React, { useEffect, useState } from "react";
// import CountUp from 'react-countup';
// import Counter from "./Counter";
// import { API_BASE_URL } from "../Api/config";

// const Dashboard = () => {
//   const [data, setData] = useState({
//     liveTenders: 0,
//     corrigendum: 0,
//     privateTenders: 0,
//     publishToday: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const responses = await Promise.all([
//           fetch(`${API_BASE_URL}/admin/summary-view/live`), 
//           fetch("http://192.168.0.230:9009/api/v1/admin/summary-view/private"),
//           fetch("http://192.168.0.230:9009/api/v1/admin/summary-view/corrigendum"),
//           fetch("http://192.168.0.230:9009/api/v1/admin/summary-view/publish-today?from_date&to_date"),
//         ]);
//         const results = await Promise.all(responses.map((res) => res.json()));

//         setData({
//           liveTenders: results[0].total_live_tender || 0, 
//           corrigendum: results[1].total_private || 0,
//           privateTenders: results[2].total_corrigendum || 0,
//           publishToday: results[3].total_publish_today || 0,
//         });
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-xl font-bold text-blue-600">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
//       <Card
//         icon="https://img.icons8.com/ios-filled/50/007bff/radio-waves.png"
//         count={data.liveTenders}
//         title="Live Tenders"
//       />
//       <Card
//         icon="https://img.icons8.com/ios-filled/50/007bff/external-link.png"
//         count={data.corrigendum}
//         title="Corrigendum"
//       />
//       <Card
//         icon="https://img.icons8.com/ios-filled/50/007bff/lock-2.png"
//         count={data.privateTenders}
//         title="Private Tenders"
//       />
//       <Card
//         icon="https://img.icons8.com/ios-filled/50/007bff/document.png"
//         count={data.publishToday}
//         title="Publish Today"
//       />
//     </div>
//   );
// };

// const Card = ({ icon, count, title }) => {

//   console.log("count test:",count);
//   return (
//     <div className="bg-white shadow-md rounded-lg p-6 text-center hover:scale-105 transition-transform duration-300">
//       <div className="flex justify-center mb-4">
//         <img src={icon} alt={title} className="h-10 w-10" />
//       </div>

//       {/* Animated count */}
//       {/* <Counter number={count} title="Posts" /> */}
//       <CountUp
//                 end={count}
//                 duration={3}
//                 className="lg:text-4xl 2xl:text-6xl heading text-2xl  text-black"
//               />
//       {/* <p>{count}</p> */}
//       <p className="text-gray-600">{title}</p>
//     </div>
//   );
// };

// export default Dashboard;
