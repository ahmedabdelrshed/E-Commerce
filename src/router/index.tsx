import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../layout/Layout";
import ProductsList from "../components/ProductsList";
import HomePage from "../components/pages/HomePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={"error"}>
        <Route index element={<HomePage />} />
        <Route path="Products" element={<ProductsList />} />
        <Route path="about" element={<h1>About Page</h1>} />
        <Route path="contact" element={<h1>Contact Page</h1>} />
      </Route>
    </>
  )
);
export default router;
