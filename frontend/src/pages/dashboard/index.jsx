import React from "react";
import useUser from "../../hooks/useUser";
import { useSelector } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const DashboardComp = React.lazy(() =>
  import("../../components/dashboard/DashboardComp")
);
const Navbar = React.lazy(() => import("../../components/navbar/Navbar"));

const Dashboard = () => {
  const { fetchUser, refreshToken } = useUser(); // fetch dari hooks useUser
  const { isLoggin, user } = useSelector((state) => state.auth);

  // Mengambil accessToken dari redux
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  // invalidate data / melakukan update fetch dengan key "users"
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ["users"] });

  // Fetching data dengan Tanstack Query
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUser(accessToken),
    refetchOnWindowFocus: false,
    // placeholderData: keepPreviousData,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!user) {
    return null;
  }

  const handleRefresh = () => {
    refreshToken();
  };

  // if (!isLoggin && user.user.role === "ADMIN") {
  //   <div>Akses hanya admin</div>;
  // }

  return (
    <>
      <Navbar user={user.user} />
      {data.map((users) => {
        return (
          <DashboardComp key={users.id} users={users} isLoggin={isLoggin} />
        );
      })}
      <button onClick={handleRefresh}>refresh</button>
    </>
  );
};

export default Dashboard;
