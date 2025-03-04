import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const Navbardash = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/v1/getuser", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setUser(data);
        console.log("Success fetching user:", data);
      } catch (error) {
        console.error("Error fetching user:", error.response?.data?.error || error.message);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/v1/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
      if (data.error) throw new Error(data.error);
      else navigate("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-lg flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-wide text-indigo-400">
        MyDashboard
      </div>

      {/* Profile + Logout */}
      <div className="flex items-center gap-4">
        {user && (
          <div className="relative group">
            <div className="flex items-center gap-3 cursor-pointer">
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-indigo-400"
                />
              ) : (
                <FaUserCircle className="w-10 h-10 text-gray-400" /> 
              )}
              <span className="hidden sm:block text-lg">{user.firstName}</span>
            </div>

            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                Profile
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                Settings
              </button>
              <hr />
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbardash;
