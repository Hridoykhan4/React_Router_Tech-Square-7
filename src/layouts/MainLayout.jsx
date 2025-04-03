import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  
  return (
    <>
      <header className="mt-4  border-black/20 mx-4">
        <Navbar></Navbar>
      </header>

      <main className="">
        <Outlet></Outlet>
      </main>

      <Footer></Footer>
    </>
  );
};

export default MainLayout;
