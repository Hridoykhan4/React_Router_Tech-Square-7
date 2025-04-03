import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <>
      <header className="mt-4  p-1 bg-[#9538E2] border-black/20 mx-4">
        <Navbar></Navbar>
      </header>

      <main className="">
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default MainLayout;
