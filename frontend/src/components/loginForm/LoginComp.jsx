import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

const LoginComp = () => {
  // CUSTOM HOOK
  const { loginMutation } = useUser();

  // NAVIGATE
  const navigate = useNavigate();

  // SCHEMA VALIDASI YUP
  const schema = yup.object({
    email: yup.string().required("email tidak valid"),
    password: yup.string().required("password tidak valid"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
      <div className="flex flex-col w-1/4  gap-2">
        <div>
          <form
            className="flex flex-col h-full border rounded-lg w-full px-4 py-4 gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* WELCOME */}
            <div className="flex w-full h-10 justify-center items-center">
              <p className="">Selamat datang di toko Nopi</p>
            </div>
            {/* EMAIL */}
            <div className="flex flex-col w-full">
              <label htmlFor="email">Email</label>
              <input className="w-full" type="text" {...register("email")} />
              {errors.email?.message}
            </div>
            {/* PASSWORD */}
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input type="password" {...register("password")} />
              {errors.password?.message}
            </div>
            <div className="flex w-full justify-center">
              <input
                className="px-2 py-1 border rounded-lg w-fit hover:bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300"
                type="submit"
              />
            </div>
          </form>
        </div>
        <div>
          <span>
            Belum memiliki akun ?{" "}
            <button className="px-2 py-1 border rounded-lg w-fit hover:bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
              <Link to={"/register"}>Register</Link>
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginComp;
