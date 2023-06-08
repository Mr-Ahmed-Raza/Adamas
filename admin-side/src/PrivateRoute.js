import { Route } from "react-router-dom/cjs/react-router-dom.min";
const isAuthenticated = localStorage.getItem("token");

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);