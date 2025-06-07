
import { useSelector } from "react-redux";
import { TRootState } from "../store/store";


const ProfilePage = () => {
  const user = useSelector((state: TRootState) => state.user.user);

  if(!user){
    window.location.href = "/Login"
    return null;
  }

  const userName = user?.name.first || "Guest"; // Fallback to "Guest" if user is null or undefined
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 className="text-4xl font-bold mb-4">Profile Page</h1>
      <p className="text-lg text-gray-700">Welcome {userName}</p>
      <p className="text-lg text-gray-700">Email: {user?.email || "No email"}</p>
      <p className="text-lg text-gray-700">Location: {user?.address?.city || "Unknown city"}, {user?.address?.state || "Unknown state"}, {user?.address?.country || "Unknown country"}</p>
      <p className="text-lg text-gray-700">street: {user?.address.street || "No street"}</p>
      <p className="text-lg text-gray-700">Phone: {user?.phone || "No phone"}</p>
      <img src={user?.image?.url || "/default-image.jpg"} alt={user?.image?.alt || "Profile"} className="w-32 h-32 rounded-full mt-4" />
      <p className="text-lg text-gray-700">Business: {user?.isBusiness ? "Yes" : "No"}</p>
      
     
    </div>
  );
}

export default ProfilePage;