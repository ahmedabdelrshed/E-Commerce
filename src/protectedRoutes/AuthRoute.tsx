import { Navigate } from "react-router-dom";
import CookieService from "../services/CookieService";
import { ReactNode } from "react";
interface IAuth {
  element: ReactNode;
}

const AuthRoute = ({ element }: IAuth) => {
  const token = CookieService.get("jwt");

  if (!token) {
    return <Navigate to="/login" />;
  }
  return element;
};

export default AuthRoute;
