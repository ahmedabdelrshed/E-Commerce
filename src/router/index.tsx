import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../layout/Layout";
import ProductsList from "../components/ProductsList";
import HomePage from "../components/pages/HomePage";
import LoginPage from "../components/pages/LoginPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={"error"}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsList />} />
        <Route path="dashboard" element={<h2>Dashboard</h2>} />
        <Route path="about" element={<h1>About Page</h1>} />
        <Route path="contact" element={<h1>Contact Page</h1>} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </>
  )
);
export default router;
