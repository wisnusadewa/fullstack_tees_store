import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterComp from "./components/registerForm/registerForm";
import LoginComp from "./components/loginForm/LoginComp";
import Dashboard from "./pages/dashboard";

const PublicLayout = React.lazy(() => import("./Layout/PublicLayout"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicLayout />,
    },
    {
      path: "/register",
      element: <RegisterComp />,
    },
    {
      path: "/login",
      element: <LoginComp />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
