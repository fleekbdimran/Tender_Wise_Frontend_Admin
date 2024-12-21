import React, { useState, useEffect } from "react";

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  // Toggle dark mode
  const handleToggle = () => {
    setDarkMode((prev) => !prev);
  };

  // Format date and time
  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} h-screen flex items-center justify-center`}>
      <div className="flex items-center space-x-4">
        {/* Date */}
        <div className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-full">
          <span>{formattedDate}</span>
        </div>

        {/* Time */}
        <div className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-full">
          <span>{formattedTime}</span>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={handleToggle}
          className={`p-3 rounded-full ${darkMode ? "bg-teal-500" : "bg-gray-800"} text-white`}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  );
}

export default DarkModeToggle;
