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
import AdminDashBoard from "../pages/dashboard";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import ProductsTable from "../pages/dashboard/ProductsTable";
import CategoriesTable from "../pages/dashboard/CategoriesTable";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AppLayout />} errorElement={<ErrorHandler />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsList />} />
        <Route
          path="product/:id"
          element={<AuthRoute element={<ProductPage />} />}
        />
      </Route>
      <Route
        path="/dashboard"
        element={<AuthRoute element={<DashboardLayout />} />}
        errorElement={<ErrorHandler />}
      >
        <Route index element={<AdminDashBoard />} />
        <Route path="products" element={<ProductsTable />} />
        <Route path="categories" element={<CategoriesTable />} />
        <Route path="*" element={<ErrorHandler />} />
      </Route>
      <Route
        path="/login"
        element={<ProtectedLogin element={<LoginPage />} />}
      />
      <Route
        path="/register"
        element={<ProtectedLogin element={<RegisterPage />} />}
      />
      <Route path="*" element={<ErrorHandler />} />
    </>
  )
);
export default router;
