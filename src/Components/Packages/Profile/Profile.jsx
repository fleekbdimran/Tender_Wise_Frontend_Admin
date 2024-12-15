
const Profile = () => {
    return (
      <div className="flex items-center justify-start p-4 rounded-lg w-full space-x-4 transition-shadow duration-300 ease-in-out ">
        {/* Logo/Icon Section */}
        <div className="w-14 h-14 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-300">
          <img
            src="https://via.placeholder.com/40x40" // Replace with your logo URL
            alt="e-Tender"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
  
        {/* Text Section */}
        <div className="flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-500 transition-colors duration-300">
            Jessore Car Rental
          </h3>
          <p className="text-sm text-gray-500">Your trusted car rental service</p>
        </div>
      </div>
    );
  };
  
  export default Profile;
  

