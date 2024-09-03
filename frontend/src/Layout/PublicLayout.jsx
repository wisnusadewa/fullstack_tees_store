import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileComp = React.lazy(() =>
  import("../components/profile/ProfileComp")
);

const PublicLayout = () => {
  // PR : ARAHKAN PAGES KE HALAMAN LOGIN //
  const { isLoggin } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggin) {
      navigate("/login");
    }
  }, [isLoggin, navigate]);

  return (
    <>
      {/* Tampilkan ProfileComp jika sudah login */}
      <div className="flex w-full h-screen bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
        <ProfileComp />
      </div>
    </>
  );
};

export default PublicLayout;
