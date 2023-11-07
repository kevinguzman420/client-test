import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// pages components
// common
import Home from "./pages/Home";
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
        <Route path="/" element={<Home />} />
        {/* customer */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/menu" element={<Menu />} />
        <Route path="/dashboard/pay" element={<Pay />} />
        <Route path="/dashboard/orders" element={<Orders />} />
        {/* user */}
        <Route path="/dashboard/orders/user" element={<OrdersUser />} />
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
