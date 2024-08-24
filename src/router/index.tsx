import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <h2>
            Hello <Outlet />
          </h2>
        }
        errorElement={'error'}
      >
        <Route index element={<h1>Home Page</h1>} />
        <Route path="about" element={<h1>About Page</h1>} />
        <Route path="contact" element={<h1>Contact Page</h1>} />
      </Route>
    </>
  )
);
export default router;
