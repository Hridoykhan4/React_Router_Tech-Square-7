import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CartContext, WishContext } from "../utilities/localDB";
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
      <div
        className={`navbar ${
          pathname === "/" && "bg-[#9538E2]"
        } shadow-sm px-5`}
      >
        <div className="navbar-start">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link
            to="/"
            className="text-xl"
          >
            Tech Square
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end gap-4">
          <input
          checked={theme === 'forest'}
            type="checkbox"
            onClick={handleTheme}
            className="toggle theme-controller"
          />

          <div className="relative">
            <i className="fa-solid text-md bg-white/30 rounded-full p-2 fa-cart-shopping">
              <span className="absolute font-bold text-lg -top-2">
                {addCartCount}
              </span>
            </i>
          </div>
          <div className="relative">
            <i className="fa-regular text-md  bg-white/30 rounded-full p-2 fa-heart"></i>
            <span className="absolute -right-1 font-bold text-lg -top-2">
              {addWishCount}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
