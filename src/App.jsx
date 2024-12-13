import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import * as ROUTES from "./constans/routes";
import ProtectedRoute from "./helpers/ProtectedRoute";
import IsUserLoggedIn from "./helpers/IsUserLoggedIn";
import { useUser } from "./hooks/useUser";
import "./index.css";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  const { userData } = useUser(); // Accede a userData desde el contexto

  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route
            path={ROUTES.LOGIN}
            element={
              <IsUserLoggedIn userData={userData} loggedInPath={ROUTES.DASHBOARD}>
                <Login />
              </IsUserLoggedIn>
            }
          />
          <Route
            path={ROUTES.SIGN_UP}
            element={
              <IsUserLoggedIn userData={userData} loggedInPath={ROUTES.DASHBOARD}>
                <SignUp />
              </IsUserLoggedIn>
            }
          />

          <Route
            path={ROUTES.DASHBOARD}
            element={
              <ProtectedRoute userData={userData}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
