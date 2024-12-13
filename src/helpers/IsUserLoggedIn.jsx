import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const IsUserLoggedIn = ({ userData, loggedInPath, children }) => {
  if (userData) {
    return <Navigate to={loggedInPath} />;
  }
  return children;
};

IsUserLoggedIn.propTypes = {
  userData: PropTypes.object,
  loggedInPath: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default IsUserLoggedIn;
