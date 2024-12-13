import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import * as ROUTES from "../constans/routes";

const ProtectedRoute = ({ userData, children }) => {
  if (userData) {
    return children;
  }
  return <Navigate to={ROUTES.LOGIN} />;
};

ProtectedRoute.propTypes = {
  userData: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
