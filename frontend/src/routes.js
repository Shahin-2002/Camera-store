import Home from "./pages/Index/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import OTPVerification from "./pages/OTPVerification/OTPVerification";
import Category from "./pages/Category/Category";
import NotFound from "./pages/NotFound/NotFound";
import VerifyUser from "./pages/verifyUser/VerifyUser";
import OTPVerifyPassword from "./pages/OTPVerifyPassword/OTPVerifyPassword";
import ProductPage from "./pages/Products/ProductPage";
import UserPanelLayout from "./pages/UserPanel/UserPanelLayout";
import Profile from "./pages/UserPanel/Profile";
import Dashboard from "./pages/UserPanel/Dashboard";







const route = [
  { path: "/", element: <Home /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/verify", element: <OTPVerification /> },
  { path: "/category", element: <Category /> },
  { path: "/otp-verify-password", element: <OTPVerifyPassword /> },
  { path: "/category/:slug", element: <Category /> },
  { path: "*", element: <NotFound /> },
  { path: "/verify-user", element: <VerifyUser /> },
  { path: "/product/:id", element: <ProductPage /> },


  {
    path: "/user-panel",
    element: <UserPanelLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
    ],
  },
];

export default route;
