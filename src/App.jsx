import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import * as ROUTES from "./constans/routes";
import "./index.css";
import { UserProvider  } from './context/userProvider.jsx'; // Asegúrate de que esta ruta sea correcta


const Login = lazy(() => import("./pages/Login.jsx"));
const SignUp = lazy(() => import("./pages/SignUp.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

function App() {
    return (
        <UserProvider >
            <Router>
                <Suspense fallback={<p>Loading...</p>}>
                    <Routes>
                        <Route path={ROUTES.LOGIN} element={<Login />} />
                        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
                        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </Router>
        </UserProvider >
    );
}

export default App;
