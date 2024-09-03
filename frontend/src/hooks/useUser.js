import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

// AXIOS BASE URL
import axiosInstance from "../API/axiosInstance";
import { loginSuccess } from "../redux/users/userSlice";

// REGISTER FETCH
const register = async (data) => {
  const response = await axiosInstance.post("/register", data);
  return response.data;
};

// LOGIN FETCH
const login = async (data) => {
  try {
    const response = await axiosInstance.post("/login", data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// FETCH USER
const fetchUser = async (accessToken) => {
  const response = await axiosInstance.get("/users", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// FETCH TOKEN
const refreshToken = async () => {
  const response = await axiosInstance.get("/token");
  return response.data;
};

// ==================================================

// CUSTOM HOOKS
const useUser = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  // REGISTER QUERY
  const registerMutation = useMutation({
    mutationFn: register,
    mutationKey: ["users"],
    onSuccess: (data) => {
      console.log("register sukses", data);
      queryClient.invalidateQueries(["users"]);
    },
  });

  // LOGIN USER QUERY
  const loginMutation = useMutation({
    mutationFn: login,
    mutationKey: ["users"],
    onSuccess: (data) => {
      console.log("login sukses", data);
      dispatch(loginSuccess(data));
      queryClient.invalidateQueries(["users"]);
    },
  });

  // FETCH USER

  // const fetchAllUserMutation = (token) => {
  //   return useQuery({
  //     queryKey: ["users", token],
  //     queryFn: async () => {
  //       const response = await axiosInstance.get("/users", {
  //         headers: {
  //           Authorization: token,
  //         },
  //       });
  //       return response.data;
  //     },
  //     enabled: !!token, // Hanya fetch data jika token ada
  //   });
  // };

  return { registerMutation, fetchUser, loginMutation, refreshToken };
};

export default useUser;
