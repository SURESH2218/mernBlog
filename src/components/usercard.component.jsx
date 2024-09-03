import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  let fullname = user?.personal_info?.fullname;
  let username = user?.personal_info?.username;
  let profile_img = user?.personal_info?.profile_img;

  return (
    <Link to={`/user/${username}`} className="flex gap-5 items-center mb-5 ">
      <img src={profile_img} className="w-14 h-14 rounded-full" alt="" />
      <div>
        <h1 className="font-medium text-xl line-clamp-2">{fullname}</h1>
        <p className="text-dark-grey">@{username}</p>
      </div>
    </Link>
  );
};
export default UserCard;
