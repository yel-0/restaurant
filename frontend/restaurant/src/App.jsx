import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import CookLayout from "./Layout/CookLayout";
import AdminLayout from "./Layout/AdminLayout"; // Add Admin Layout import
import WaiterLayout from "./Layout/WaiterLayout"; // Add Waiter Layout import
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import WaiterOrders from "./Pages/Waiter/WaiterOrders";
import CookDashboard from "./Pages/Cook/CookDashboard";
import Start from "./Pages/Home/Start";
import AdminUserLIst from "./Pages/Admin/AdminUserLIst";
import AdminTables from "./Pages/Admin/AdminTables";
import AdminMenu from "./Pages/Admin/AdminMenu";
import AdminInventory from "./Pages/Admin/AdminInventory";
import AdminCreateMenu from "./Pages/Admin/AdminCreateMenu";
import AdminUpdateMenu from "./Pages/Admin/AdminUpdateMenu";

const App = () => (
  <AuthProvider>
    <Router>
      {/* Content */}
      <Routes>
        {/* Admin Route */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminLayout>
              <AdminUserLIst />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/tables"
          element={
            <AdminLayout>
              <AdminTables />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/menus"
          element={
            <AdminLayout>
              <AdminMenu />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/menu/create"
          element={
            <AdminLayout>
              <AdminCreateMenu />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/menu/update"
          element={
            <AdminLayout>
              <AdminUpdateMenu />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/inventory"
          element={
            <AdminLayout>
              <AdminInventory />
            </AdminLayout>
          }
        />

        {/* Waiter Route */}
        <Route
          path="/waiter"
          element={
            <WaiterLayout>
              <WaiterOrders />
            </WaiterLayout>
          }
        />

        {/* Cook Route */}
        <Route
          path="/cook"
          element={
            <CookLayout>
              <CookDashboard />
            </CookLayout>
          }
        />

        {/* Default Route */}
        <Route path="/" element={<Start />} />
      </Routes>

      {/* Footer (Optional) */}
    </Router>
  </AuthProvider>
);

export default App;
