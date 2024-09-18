import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router";
import CartDrawer from "./components/CartDrawer";
function App() {
  return (
    <>
      <>
        <CartDrawer />
        <RouterProvider router={router}></RouterProvider>
      </>
    </>
  );
}

export default App;
