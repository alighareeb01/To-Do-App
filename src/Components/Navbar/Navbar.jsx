import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { CounterContext } from "../Context/CounterContext";
import { UserContext } from "../Context/UserContextProvider";

export default function Navbar() {
  let user = useContext(UserContext);
  // console.log(user);

  let nav = useNavigate();
  function handleSignout() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    user.setToken("");
    // user.setData({});
    nav("/profile");
  }
  return (
    <>
      <nav className="bg-neutral-primary  w-full z-20 top-0 start-0   nav-bar">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-xl text-heading font-semibold whitespace-nowrap main">
              <i className="fas fa-home main"></i> To Do
            </span>
          </Link>
          <div className="flex items-center gap-8" id="navbar-user ">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0">
              {user.token && (
                <li className="">
                  <Link
                    to="/"
                    className="main block py-2 px-3 text-white bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
              )}
              {user.token && (
                <li className="">
                  <Link
                    to="profile"
                    className="main block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                  >
                    Profile
                  </Link>
                </li>
              )}
              {!user.token && (
                <li className="">
                  <Link
                    to="login"
                    className=" main block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                  >
                    Login
                  </Link>
                </li>
              )}
              {!user.token && (
                <li className="">
                  <Link
                    to="register"
                    className="main  block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                  >
                    Register
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="flex text-sm bg-neutral-primary rounded-full md:me-0 focus:ring-4 focus:ring-neutral-tertiary"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>

              <div className="relative w-10 h-10 overflow-hidden bg-neutral-secondary-medium rounded-full">
                <svg
                  className="absolute w-12 h-12 text-body-subtle -left-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </button>
            {/* Dropdown menu */}
            <div
              className="z-50 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44"
              id="user-dropdown"
            >
              <ul
                className="p-2 text-sm text-body font-medium"
                aria-labelledby="user-menu-button"
              >
                <li>
                  <Link
                    to="profile"
                    className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                  >
                    Profile
                  </Link>
                </li>
                {user.token !== "" && (
                  <li>
                    <Link
                      href="/"
                      className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                      onClick={() => {
                        handleSignout();
                        nav("/profile");
                      }}
                    >
                      Signout
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth={2}
                  d="M5 7h14M5 12h14M5 17h14"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
