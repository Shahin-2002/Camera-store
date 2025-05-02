import Home from "./pages/Index/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import OTPVerification from "./pages/OTPVerification/OTPVerification";
import Category from "./pages/Category/Category";
import NotFound from "./pages/NotFound/NotFound";
import VerifyUser from "./pages/verifyUser/VerifyUser";
const route = [
  { path: "/", element: <Home /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/verify", element: <OTPVerification /> },
  { path: "/category", element: <Category /> },
  { path: "/category/:slug", element: <Category /> },
  { path: "*", element: <NotFound /> },
  { path: "/verify-user", element: <VerifyUser /> },
];

export default route;
