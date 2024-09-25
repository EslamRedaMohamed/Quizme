import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
import { useUserContext } from "./UserContext";
const NAV_LOGGED_IN = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Create Exam",
    path: "/create-exam",
  },
  {
    name: "Profile",
    path: "/profile",
  },
];

const NAV_LOGGED_OUT = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Login",
    path: "/login",
  },
  {
    name: "Register",
    path: "/register",
  },
];
const Navbar = () => {
  console.log("Rendering Navbar");
  const { user } = useUserContext();
  const isAuthenticated = user ? true : false;
  console.log(user);

  return (
    <nav className="bg-gray-200">
      <div className="flex justify-between mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-3xl font-bold text-gray-800">
          Quizme
        </Link>
        <ul className="hidden sm:flex items-center">
          {isAuthenticated
            ? NAV_LOGGED_IN.map((item) => (
                <li key={item.name} className="mx-2">
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ))
            : NAV_LOGGED_OUT.map((item) => (
                <li key={item.name} className="mx-2">
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
