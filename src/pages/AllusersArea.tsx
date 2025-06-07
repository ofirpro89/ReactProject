import { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import Tadmin from "../Ts/Tadmin";
import axios from "axios";
import { useSelector } from "react-redux";
import { TRootState } from "../store/store";
import { toast } from "react-toastify";

const USERS_PER_PAGE = 5;

const AllUsersArea = () => {
    const token = localStorage.getItem("token");
    const [users, setUsers] = useState<Tadmin[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const user = useSelector((state: TRootState) => state.user.user);
    
  if(!user?.isAdmin){
    window.location.href = "/Login"
    return null;
  }

    useEffect(() => {
        axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users", {
            headers: {
                "x-auth-token": token,
            },
        })
        .then((res) => {
            setUsers(res.data);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching users:", err);
            setLoading(false);
        });
    }, []);

    const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const currentUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (users.length === 0) return <div className="text-center mt-10">No users found</div>;

    const deleteUser = async (userId: string) => {
        try {
            await axios.delete(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`, {
                headers: {
                    "x-auth-token": token,
                },
            });
           
            setUsers(users.filter((user) => user._id !== userId));
            toast.success("User deleted successfully");
            
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };




    return (
        <div className="p-80 w-full max-w-full overflow-x-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">All Users Area</h1>
            <table className="w-full border border-gray-300 shadow-sm rounded-md bg-white text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border">#</th>
                        <th className="p-2 border">First Name</th>
                        <th className="p-2 border">Last Name</th>
                        <th className="p-2 border">Phone</th>
                        <th className="p-2 border">City</th>
                        <th className="p-2 border">Street</th>
                        <th className="p-2 border">House</th>
                        <th className="p-2 border">ZIP</th>
                        <th className="p-2 border">State</th>
                        <th className="p-2 border">Country</th>
                        <th className="p-2 border">Image</th>
                        <th className="p-2 border">Type</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Password</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="p-2 border text-center">{startIndex + index + 1}</td>
                            <td className="p-2 border">{user.name.first}</td>
                            <td className="p-2 border">{user.name.last}</td>
                            <td className="p-2 border">{user.phone}</td>
                            <td className="p-2 border">{user.address.city}</td>
                            <td className="p-2 border">{user.address.street}</td>
                            <td className="p-2 border">{user.address.houseNumber}</td>
                            <td className="p-2 border">{user.address.zip}</td>
                            <td className="p-2 border">{user.address.state}</td>
                            <td className="p-2 border">{user.address.country}</td>
                            <td className="p-2 border max-w-[200px] truncate">{user.image.url}</td>
                            <td className="p-2 border">{user.isBusiness ? "Business" : "Personal"}</td>
                            <td className="p-2 border">{user.email}</td>
                            <td className="p-2 border">{user.password}</td>
                            <td className="p-2 border">
                                <div className="flex flex-col gap-1">
                                    <Button size="xs" color="blue" onClick={() => console.log("Edit", user._id)}>
                                        Edit
                                    </Button>
                                    <Button size="xs" color="green" onClick={()=>deleteUser(user._id)}>
                                        Delete
                                    </Button>
                                    <Button size="xs" color="pink" onClick={() => console.log("Profile", user._id)}>
                                        Profile
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Navigation */}
            <div className="flex justify-center mt-6 gap-4">
                <Button
                    color="gray"
                    size="sm"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    הקודם
                </Button>
                <Button
                    color="gray"
                    size="sm"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    הבא
                </Button>
            </div>
        </div>
    );
};

export default AllUsersArea;
