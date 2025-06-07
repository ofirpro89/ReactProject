
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TRootState } from "../store/store";
import { Button } from "react-bootstrap";

const AdminEria = () => {
const user = useSelector((state: TRootState) => state.user.user);
    if(!user?.isAdmin){
        window.location.href = "/Login"
        return null;
      }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  <Link to="/allusers">
  <Button>All Users Area</Button>
</Link>



    </div>
  );
};

export default AdminEria;
