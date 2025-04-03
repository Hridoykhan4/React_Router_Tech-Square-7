import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ProductCards from "../components/ProductCards";
import Details from "../pages/Details";
import Dashboard from "../pages/Dashboard";
import About from "../pages/About";
import ErrorPage from "../pages/ErrorPage";
import Statistics from "../pages/Statistics";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("/category.json"),
        children: [
          {
            index: true,
            element: <ProductCards></ProductCards>,
            loader: () => fetch("/products.json"),
          },
          {
            path: "/product/:productCategory",
            element: <ProductCards></ProductCards>,
            loader: () => fetch("/products.json"),
          },
        ],
      },
      {
        path: "/detail/:productId",
        element: <Details></Details>,
        loader: () => fetch("/products.json"),
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/statistics",
        element: <Statistics></Statistics>,
        loader: () => fetch("/products.json"),
      },
    ],
  },
]);
