import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/users/userSlice";
import { Link } from "react-router-dom";

const ProfileComp = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return null;
  }

  return (
    <>
      {/* JIKA LOGIN MAKA TAMPILKAN PROFILE */}
      <div className="flex flex-col w-full ">
        {/* LOGOUT */}
        <div className="flex justify-end px-4 py-2">
          <button
            className="border font-semibold rounded-lg px-2 py-1 hover:text-red-500"
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        </div>

        {/* PROFILE */}
        <div className="flex justify-center items-center mt-40 ">
          <div className="flex flex-col w-52 h-64 items-center justify-center gap-2 shadow-2xl">
            <p>My Profile</p>
            <div className="border w-1/2 h-1/2 ">
              <img className="object-cover" src="" alt="" />
            </div>
            <p>{user.user.email}</p>
            <p>{user.user.role}</p>
          </div>
        </div>

        <div className="flex justify-center items-center mx-2 my-6 gap-4">
          {user.user.role === "ADMIN" && (
            <button className="italic rounded-lg px-2 py-1 shadow-2xl bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 hover:scale-110 transition delay-100 duration-300 ease-in-out">
              <Link to={"/dashboard"}>Dashboard</Link>
            </button>
          )}
          <button className="italic px-2 py-1 rounded-lg bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 hover:scale-110 transition delay-100 duration-300 ease-in-out">
            <Link to={"/"}>To Shop</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileComp;
