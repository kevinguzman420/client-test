import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// pages components
import Home from "./pages/Home";
import Menu from "./pages/dashboard/Menu";
import Dashboard from "./pages/dashboard/Dashboard";
import Pay from "./pages/dashboard/Pay";
import Orders from "./pages/dashboard/Orders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/menu" element={<Menu />} />
        <Route path="/dashboard/pay" element={<Pay />} />
        <Route path="/dashboard/orders" element={<Orders />} />
        <Route path="*" element={<h1>Page not found</h1>} />
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
