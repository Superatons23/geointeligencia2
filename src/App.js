import "./App.css";

import Login from "./pages/login/Login";
import { Grid } from "@material-ui/core";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import PasswordRecovery from "./pages/PasswordRecovery";
import { makeStyles } from "@material-ui/core/styles";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Dashboard from "./pages/Dashboard";
import React, { useState, useEffect } from "react";
const useStyles = makeStyles((theme) => ({
  login: {
    marginTop: "75px",
  },
  passwordRecovery: {
    marginTop: "75px",
  },
}));
function App() {
  const [isAuth, setIsAuth] = useState(false);
  const classes = useStyles();
  const auth = getAuth();

  return (
    <Container fluid className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/signin"
            element={
              <Grid
                container
                justifyContent="center"
                alignContent="center"
                className={classes.login}
              >
                <Login />
              </Grid>
            }
          />
          <Route
            path="/password-recovery"
            element={
              <Grid
                container
                justifyContent="center"
                alignContent="center"
                className={classes.passwordRecovery}
              >
                <PasswordRecovery />
              </Grid>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Grid
                container
                justifyContent="center"
                alignContent="center"
                // className={classes.passwordRecovery}
              >
                <RequireAuth redirectTo="/signin">
                  <Dashboard />
                </RequireAuth>
              </Grid>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
  function RequireAuth({ children, redirectTo }) {
    console.log(auth);
    return auth.currentUser !== null ? children : <Navigate to={redirectTo} />;
  }
}

export default App;
