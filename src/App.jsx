import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import toast, { Toaster } from "react-hot-toast";
import "./../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/Notfound";
// import { CounterContext } from "./Components/Context/CounterContext";
import UserContextProvider from "./Components/Context/UserContextProvider";

function App() {
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "Notfound",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <div className="page-dark">
      <UserContextProvider>
        <RouterProvider router={routes}></RouterProvider>
        <Toaster />
      </UserContextProvider>
    </div>
  );
}

export default App;
