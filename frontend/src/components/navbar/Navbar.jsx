/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };
  return (
    <div className="flex w-full border justify-between items-center px-4 h-10">
      <div>
        <button
          className="border px-2 py-1 rounded-lg hover:bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 hover:scale-105 transition delay-100 duration-300 ease-in-out"
          onClick={handleBack}
        >
          Back
        </button>
      </div>
      <div>
        <p> Welcome, {user.email}</p>
      </div>
    </div>
  );
};

export default Navbar;
