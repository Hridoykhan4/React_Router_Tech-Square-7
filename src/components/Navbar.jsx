import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CartContext, WishContext } from "../utilities/localDB";
import toast from "react-hot-toast";
const Navbar = () => {
  const { pathname } = useLocation();
  const [addCartCount] = useContext(CartContext);
  const [addWishCount] = useContext(WishContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const handleTheme = (e) => {
    const themeState = e.target.checked ? "forest" : "light";
    themeState === "forest"
      ? toast.success("Theme Updated To Forest!", {
          position: "bottom-end",
        })
      : toast.success("Theme Updated To Light!", {
          position: "bottom right",
        });
    setTheme(themeState);
    localStorage.setItem("theme", themeState);
  };

  const links = (
    <>
      <li>
        <NavLink
          to={`/`}
          className={({ isActive }) =>
            `${isActive && "text-amber-200 underline font-bold"} text-[17px]`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/about`}
          className={({ isActive }) =>
            `${isActive && "text-amber-200 underline font-bold"} text-[17px]`
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/statistics`}
          className={({ isActive }) =>
            `${isActive && "text-amber-200 underline  font-bold"} text-[17px]`
          }
        >
          Statistics
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/dashboard`}
          className={({ isActive }) =>
            `${isActive && "text-amber-200  underline font-bold"} text-[17px]`
          }
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );
  return (
    <>
      <div className={`navbar ${pathname === "/" && "bg-[#9538E2]"} shadow-sm`}>
        <div className="navbar-start">
          <Link to="/" className="text-xl ">
            Tech Square
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end sm:gap-3 gap-1">
          <input
            onChange={handleTheme}
            checked={theme === "forest"}
            type="checkbox"
            className="toggle theme-controller"
          />

          <div className="relative cursor-pointer">
            <details className=" dropdown">
              <summary className="fa-solid m-1  text-md bg-white/20 rounded-full p-2 fa-cart-shopping"></summary>
              <ul className="menu dropdown-content sm:w-52 w-36 right-2 bg-base-100/80 rounded-box z-1  p-2 shadow-sm">
                <p className="font-bold">{addCartCount} Item in Cart</p>
                <hr className="pb-2"/>
                <Link className="btn self-start btn-sm bg-[#9538E2] text-white" to="/dashboard">Dashboard</Link>
              </ul>
            </details>
            <span className="absolute font-bold text-lg -top-3 left-6">
              {addCartCount}
            </span>
          </div>

          <div className="relative">
            <i className="fa-regular text-md  bg-white/30 rounded-full p-2 fa-heart"></i>
            <span className="absolute right-1 font-bold text-lg -top-4">
              {addWishCount}
            </span>
          </div>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content right-0 bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
