import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import Menu from "./Menu";

const Header = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigation();
  const path = useLocation().pathname;
  const [user, setUser] = useState(true);

  const showMenu = () => {
    setMenu(!menu)
  }

  // const {user} = useContext(userContext)

  return (
    <div>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-black text-white">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">MyBlog</Link>
        </h1>
        {path === "/" && (
          <div className="flex justify-center items-center space-x-0">
            <input
              onChange={(e) => setPrompt(e.target.value)}
              type="text"
              placeholder="Search apost"
              className="outline-none rounded-l-xl px-3 text-black bg-white"
            />
            <p
              onClick={() =>
                navigate(prompt ? "?search" + prompt : navigate("/"))
              }
              className="cursor-pointer p-1 bg-white text-black rounded-r-xl"
            >
              <BsSearch />
            </p>
          </div>
        )}
        <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
          {user ? (
            <h3>
              <Link to="/create-post">Write</Link>
            </h3>
          ) : (
            <h3>
              <Link to="/login">Login</Link>
            </h3>
          )}
          {user ? (
            <div>
              <p className="cursor-pointer relative">
                <FaBars />
                {menu && <Menu />}
              </p>
            </div>
          ) : (
            <h3>
              <Link to="/signup">Register</Link>
            </h3>
          )}
        </div>

        <div className="md:hidden text-lg">
          <p className="cursor-pointer relative">
            <FaBars />
          </p>
          {menu && <Menu />}
        </div>
      </div>
    </div>
  );
};

export default Header;
