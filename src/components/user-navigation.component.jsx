import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { useContext } from "react";
import { UserContext } from "../App";
import { removeFromSession } from "../common/session";

const UserNavigationPanel = () => {
  const { userAuth, setUserAuth } = useContext(UserContext);
  // console.log(userAuth);

  const username =
    userAuth?.data?.user?.personal_info?.username ||
    userAuth?.message?.user?.personal_info?.username;
  const email = userAuth?.data?.user?.personal_info?.email;

  const signOutUser = () => {
    removeFromSession("userDetails");
    setUserAuth({ accessToken: null });
  };

  return (
    <AnimationWrapper
      className="absolute right-0 z-50"
      transition={{ duration: 0.2 }}
    >
      <div className="bg-white absolute right-0 border border-grey w-60 duration-200">
        <Link to="/editor" className="flex gap-2 link  pl-8 py-4">
          <i className="fi fi-rr-edit"></i>
          <p>write</p>
        </Link>
        <Link to={`/user/${username}`} className="link pl-8 py-4">
          Profile
        </Link>
        <Link to="/dashboard/blogs" className="link  pl-8 py-4">
          Dashboard
        </Link>
        <Link to="/settings/edit-profile" className="link pl-8 py-4">
          Settings
        </Link>
        <button className="link pl-8 py-4 text-left w-full">
          <h1 className="font-bold text-xl mg-1 " onClick={signOutUser}>
            Sign Out
          </h1>
          <p className="text-dark-grey">@{username}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
};
export default UserNavigationPanel;
