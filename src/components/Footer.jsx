import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  return (
    <>
      <footer
        className={` sm:footer-horizontal  bg-base-200 ${
          pathname.includes("dashboard") && "mt-12"
        } text-base-content ${
          pathname.includes("detail") && "mt-24 sm:mt-44"
        }`}
      >
        <div className="py-4">
          <h1 className="font-fold  pl-10 text-lg py-3 font-bold">Tech Square</h1>
          <p className="text-left pl-10">
            Leading the way in cutting-edge technology and innovation.
          </p>
        </div>
        <div className="footer sm:footer-horizontal bg-base-200 my-4 px-10">
          <nav>
            <h6 className="text-lg font-bold !">Services</h6>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
          <nav>
            <h6 className="text-lg font-bold !">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav>
            <h6 className="text-lg font-bold !">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </div>
      </footer>
    </>
  );
};

export default Footer;
