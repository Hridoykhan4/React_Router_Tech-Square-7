import { Outlet, useLoaderData } from "react-router-dom";
import Categories from "../components/Categories";
import ReusableBanner from "../components/ReusableBanner";
import banner from "../assets/banner.jpg";
const Home = () => {
  const categories = useLoaderData();

  return (
    <>
      <ReusableBanner>
        <div className="text-center bg-[#9538E2] text-white space-y-4  py-2">
          <h2 className="font-extrabold px-5 text-2xl md:text-3xl lg:text-4xl">
            Upgrade Your Tech Accessorize with <br /> Gadget Heaven Accessories
          </h2>
          <p className="w-11/12 mx-auto">
            Explore the latest gadgets that will take your experience to the{" "}
            <br /> next level. From smart devices to the coolest accessories, we
            have it all!
          </p>
          <button className="btn hover:bg-white rounded-s-4xl rounded-e-4xl px-8 text-[#9538E2]">
            Shop Now
          </button>

          <figure className="w-1/2 mt-6 border p-3 mx-auto sm:-mb-44 rounded -mb-24">
            <img src={banner} className="w-full h-full rounded-md" alt="" />
          </figure>
        </div>
      </ReusableBanner>
      <div className="mt-24 w-11/12 mx-auto mb-10 sm:mt-44">
        <h3 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-center">
          Explore Cutting-Edge Gadgets
        </h3>

        <div className="flex flex-col mt-10 md:flex-row gap-5">
          <div className="sm:w-2/12">
            <Categories categories={categories}></Categories>
          </div>

          <div className="sm:w-10/12">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
