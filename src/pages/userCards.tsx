import { useSelector } from "react-redux";
import { TRootState } from "../store/store";
import { Link } from "react-router-dom";
import {  Button } from "react-bootstrap";
import GetUserCard from "../conponntas/GetUserCard";
import CrateDeomCard from "../conponntas/CreateDemoCards";
const UserCards = () => {
  const user = useSelector((state: TRootState) => state.user.user);
  const userName = user?.name.first || "Guest";

console.log(user)


  return (
    <div className="relative h-screen bg-gray-100">
      {/* מרכז הדף */}
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold mb-4">Hey {userName}</h1>
        <GetUserCard />

      
      </div>

    
      <div className="fixed bottom-4 right-4 z-50">
        <Link to="/crateuserCard">
          <Button variant="primary" size="lg">
            Create a New Card
          </Button>
          </Link>
          <CrateDeomCard />
      
      </div>
    </div>
  );
};

export default UserCards;
