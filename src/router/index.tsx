import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import ProductsList from "../components/ProductsList";
import HomePage from "../components/pages/HomePage";
import LoginPage from "../components/pages/LoginPage";
import RegisterPage from "../components/pages/RegisterPage";
import ErrorHandler from "../errors/ErrorPage";
import AuthRoute from "../protectedRoutes/AuthRoute";
import ProtectedLogin from "../protectedRoutes/ProtectedLogin";

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
