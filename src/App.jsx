import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// pages components
// common
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedPage from "./pages/ProtectedPage";
// customer
import Menu from "./pages/dashboard/customer/Menu";
import Dashboard from "./pages/dashboard/customer/Dashboard";
import Pay from "./pages/dashboard/customer/Pay";
import Orders from "./pages/dashboard/customer/OrdersCustomer";
// user
import OrdersUser from "./pages/dashboard/user/OrdersUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* common */}
        <Route index element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        {/* customer */}
        <Route
          path="/dashboard"
          element={
            <ProtectedPage>
              <Dashboard />
            </ProtectedPage>
          }
        />
        <Route
          path="/dashboard/menu"
          element={
            <ProtectedPage>
              <Menu />
            </ProtectedPage>
          }
        />
        <Route
          path="/dashboard/pay"
          element={
            <ProtectedPage>
              <Pay />
            </ProtectedPage>
          }
        />
        <Route
          path="/dashboard/orders"
          element={
            <ProtectedPage>
              <Orders />
            </ProtectedPage>
          }
        />
        {/* user */}
        <Route
          path="/dashboard/orders/user"
          element={
            <ProtectedPage>
              <OrdersUser />
            </ProtectedPage>
          }
        />
        <Route path="*" element={<h1>Page not found</h1>} />
        {/* admin */}
      </Routes>

      {/* toaster */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
