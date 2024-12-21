
import { PHOTO_BASE_URL } from "../../../Api/config"; // Ensure correct import path for config file

const Profile = ({ user_name, photo }) => {
  // Log values inside the component for debugging
  // console.log("UserName:", user_name);
  // console.log("Photo:", photo);

  return (
    <div className="flex items-center space-x-4 justify-start">
      {/* Image section */}
      <img
        src={
          photo
            ? `${PHOTO_BASE_URL}${photo}` // Dynamically set photo URL
            : 'https://via.placeholder.com/50' // Placeholder if photo is missing
        }
        alt="User Photo"
        className="w-16 h-16 rounded-full"
      />

      {/* Text section */}
      <div>
        <h2 className="text-lg font-bold">{user_name || 'Name'}</h2>
      </div>
    </div>
  );
};

export default Profile;
