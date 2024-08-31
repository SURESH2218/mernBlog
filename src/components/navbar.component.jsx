import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../imgs/logo.png";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import UserNavigationPanel from "./user-navigation.component";
const Navbar = () => {
  const navigate = useNavigate();
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const [userNavPanel, setUserNavPanel] = useState(false);
  const handleUserNavPanel = () => {
    setUserNavPanel(!userNavPanel);
  };

  const { userAuth } = useContext(UserContext);
  // console.log(userAuth);

  const handleSearch = (e) => {
    let query = e.target.value;
    // console.log(e);

    if (e.keyCode == 13 && query.length) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src={logo} alt="" className="w-full" />
        </Link>
        <div
          className={
            "absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto " +
            (searchBoxVisibility ? "block" : "hidden md:block")
          }
          onKeyDown={handleSearch}
        >
          <input
            type="text"
            placeholder="Search"
            className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
          />
          <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
        </div>

        <div className="flex items-center gap-3 md:gap-6 ml-auto">
          <button
            className="bg-grey w-12 h-12 rounded-full md:hidden flex items-center justify-center"
            onClick={() => setSearchBoxVisibility(!searchBoxVisibility)}
          >
            <i className="fi fi-rr-search text-xl "></i>
          </button>

          <Link
            to="/editor"
            className="hidden md:flex gap-2 link justify-center items-center"
          >
            <i className="fi fi-rr-edit"></i>
            <p>write</p>
          </Link>

          {userAuth?.data?.accessToken || userAuth?.data?.user?.google_auth ? (
            <>
              <Link to="/dashboard/notification">
                <button className="w-12 h-12 rounded-full mt-1 bg-grey relative hover:bg-black/10">
                  <i className="fi fi-rr-bell"></i>
                </button>
              </Link>
              <div
                className="relative"
                onClick={handleUserNavPanel}
                onBlur={() =>
                  setTimeout(() => {
                    setUserNavPanel(false);
                  }, 700)
                }
              >
                <button className="w-12 h-12 mt-1">
                  <img
                    className="w-full h-full object-cover rounded-full mt-1"
                    src={
                      userAuth?.data?.user?.personal_info?.profile_img ||
                      userAuth?.message?.user?.personal_info?.profile_img
                    }
                    alt="profile"
                  />
                </button>
                {userNavPanel ? <UserNavigationPanel /> : ""}
              </div>
            </>
          ) : (
            <>
              <Link className="btn-dark py-2" to="/signin">
                Sign In
              </Link>
              <Link className="btn-light md:block hidden py-2" to="/signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
