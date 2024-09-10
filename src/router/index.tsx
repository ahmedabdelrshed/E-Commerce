import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import ProductsList from "../components/ProductsList";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ErrorHandler from "../errors/ErrorPage";
import AuthRoute from "../protectedRoutes/AuthRoute";
import ProtectedLogin from "../protectedRoutes/ProtectedLogin";
import ProductPage from "../pages/ProductDetailsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AppLayout />} errorElement={<ErrorHandler />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsList />} />
        <Route
          path="dashboard"
          element={<AuthRoute element={<h2>Dashboard</h2>} />}
        />
        <Route
          path="product/:id"
          element={<AuthRoute element={<ProductPage />} />}
        />
      </Route>
      <Route
        path="/login"
        element={<ProtectedLogin element={<LoginPage />} />}
      />
      <Route
        path="/register"
        element={<ProtectedLogin element={<RegisterPage />} />}
      />
    </>
  )
);
export default router;
