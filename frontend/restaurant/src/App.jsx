import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import WaiterOrders from "./Pages/Waiter/WaiterOrders";
import CookDashboard from "./Pages/Cook/CookDashboard";
import Start from "./Pages/Home/Start";
import Navbar from "./Design/Share/NavBar";
import Footer from "./Design/Share/Footer";

const App = () => (
  <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/waiter" element={<WaiterOrders />} />
        <Route path="/cook" element={<CookDashboard />} />
        <Route path="/" element={<Start />} />
      </Routes>
      <Footer />
    </Router>
  </AuthProvider>
);

export default App;
