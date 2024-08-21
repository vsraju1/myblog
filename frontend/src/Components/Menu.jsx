import React, { useContext } from "react";
import { UserContext } from "../Context/userContext";
import { Link, useNavigation } from "react-router-dom";

const Menu = () => {
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigation();

  const handleLogout = async() => {
    try {
      const res = await axios.get("/api/auth/logout", {withCredentials: true})
      setUser(null)
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-black w-[200px] z-10 flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-md p-4 space-y-4">
      {!user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to="/login">Login</Link>
        </h3>
      )}
      {!user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to="/signup">Signup</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to={"/about/" + user._id}>Profile</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to={"/create-post"}>Write</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to={"/myblogs/" + user._id}>My Blogs</Link>
        </h3>
      )}
      {user && (
        <h3 onClick={handleLogout} className="text-white text-sm hover:text-gray-500 cursor-pointer">
          My Blogs
        </h3>
      )}
    </div>
  );
};

export default Menu;
