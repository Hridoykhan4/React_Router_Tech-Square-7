import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ProductCards from "../components/ProductCards";
import Details from "../pages/Details";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
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
        loader: () => fetch('/products.json')
      },
    ],
  },
]);
