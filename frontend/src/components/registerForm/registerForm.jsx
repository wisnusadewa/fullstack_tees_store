import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

const RegisterComp = () => {
  // CUSTOM HOOKS
  const { registerMutation } = useUser();

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

  // SUBMIT UNTUK REGISTER DAN LOGIN
  const onSubmit = (data) => {
    registerMutation.mutate(data);
    navigate("/");
  };

  return (
    <div className="flex flex-col w-full gap-2 h-screen justify-center items-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
      <div className="w-1/4">
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
          sudah memiliki akun ?{" "}
          <button className="px-2 py-1 border rounded-lg w-fit hover:bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
            <Link to={"/login"}>Login</Link>
          </button>
        </span>
      </div>
    </div>
  );
};

export default RegisterComp;
