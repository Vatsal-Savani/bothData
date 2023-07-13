import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Charts from "./components/Charts";
import AuthModule from "./modules/AuthModule";
import Login from "./pages/Login";
import New from "./pages/New";
import Register from "./pages/Register";
import DashBoard from "./components/DashBoard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EmployeeDashboard from "./pages/employees/EmployeeDashboard";
import Profile from "./components/Profile";
import Start from "./pages/Start";
import Navbar from "./components/common/Navbar";
import MainLayout from "./layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Start />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <AuthModule>
        <MainLayout />
      </AuthModule>
    ),
    children: [
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: "/employees",
    element: (
      <AuthModule>
        <MainLayout />
      </AuthModule>
    ),
    children: [
      {
        path: "/employees",
        element: <EmployeeDashboard />,
      },
    ],
  },
  {
    path: "/nav",
    element: <Navbar />,
  },
  // {
  //   path: "/register",
  //   element: <Register />,
  // },
  {
    path: "/update",
    element: (
      <AuthModule>
        <MainLayout />
      </AuthModule>
    ),
    children: [
      {
        path: "/update",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/charts",
    element: (
      <AuthModule>
        <MainLayout />
      </AuthModule>
    ),
    children: [
      {
        path: "/charts",
        element: <Charts />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        This Page Is Not Exist
      </h1>
    ),
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
