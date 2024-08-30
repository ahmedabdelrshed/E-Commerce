import { Navigate } from "react-router-dom";
import CookieService from "../services/CookieService";
import { ReactNode } from "react";
interface IAuth {
  element: ReactNode;
}
const ProtectedLogin = ({ element }: IAuth) => {
  const token = CookieService.get("jwt");
  if (token) {
    return <Navigate to="/" />;
  }
  return element;
};

export default ProtectedLogin;
