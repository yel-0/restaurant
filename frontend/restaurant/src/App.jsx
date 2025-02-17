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
import AdminOrderDetail from "./Pages/Admin/AdminOrderDetail";
import AdminOrderView from "./Pages/Admin/AdminOrderView";
import WaiterOrderList from "./Pages/Waiter/WaiterOrderList";
import WaiterOrderDetail from "./Pages/Waiter/WaiterOrderDetail";
import WaiterTablesList from "./Pages/Waiter/WaiterTablesList";
import WaiterOrderSummary from "./Pages/Waiter/WaiterOrderSummary";
import { OrderCartProvider } from "./context/OrderCartContext";
import CookOrderDetail from "./Pages/Cook/CookOrderDetail";
import CookOrders from "./Pages/Cook/CookOrders";
import CookTVScreen from "./Pages/Cook/CookTvScreen";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import AuthLayout from "./Layout/AuthLayout";
import AdminCategory from "./Pages/Admin/AdminCategory";

const App = () => (
  <AuthProvider>
    <OrderCartProvider>
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
            path="/admin/category"
            element={
              <AdminLayout>
                <AdminCategory />
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
            path="/admin/menu/update/:id"
            element={
              <AdminLayout>
                <AdminUpdateMenu />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/order/lists"
            element={
              <AdminLayout>
                <AdminOrderView />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/order/detail"
            element={
              <AdminLayout>
                <AdminOrderDetail />
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
            path="/waiter/order"
            element={
              <WaiterLayout>
                <WaiterOrders />
              </WaiterLayout>
            }
          />
          <Route
            path="/waiter/order/summary"
            element={
              <WaiterLayout>
                <WaiterOrderSummary />
              </WaiterLayout>
            }
          />
          <Route
            path="/waiter/order/lists"
            element={
              <WaiterLayout>
                <WaiterOrderList />
              </WaiterLayout>
            }
          />
          <Route
            path="/waiter/order/detail"
            element={
              <WaiterLayout>
                <WaiterOrderDetail />
              </WaiterLayout>
            }
          />
          <Route
            path="/waiter/tables"
            element={
              <WaiterLayout>
                <WaiterTablesList />
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
          <Route
            path="/cook/order/detail"
            element={
              <CookLayout>
                <CookOrderDetail />
              </CookLayout>
            }
          />
          <Route
            path="/cook/orders"
            element={
              <CookLayout>
                <CookOrders />
              </CookLayout>
            }
          />
          <Route
            path="/cook/tv"
            element={
              <CookLayout>
                <CookTVScreen />
              </CookLayout>
            }
          />

          {/* Default Route */}
          <Route path="/" element={<Start />} />

          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/register"
            element={
              <AuthLayout>
                <Register />
              </AuthLayout>
            }
          />
        </Routes>

        {/* Footer (Optional) */}
      </Router>
    </OrderCartProvider>
  </AuthProvider>
);

export default App;
