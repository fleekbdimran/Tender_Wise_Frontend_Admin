
import ReactDOM from "react-dom";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex items-center bg-white shadow-lg rounded-lg p-4 max-w-sm w-full">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          <img
            src="https://via.placeholder.com/150" // Replace with avatar URL
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Imran Uddin Chowdhury
          </h3>
          <div className="text-sm text-gray-500 flex items-center">
            Activities
            <span className="ml-1 text-gray-600">&#x25BC;</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;