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
import { AuthProvider } from "./database/Auth";
import RequireAuth from "./components/routes/RequireAuth";
import Twitter from "./pages/Twitter";
import ResetPassword from "./pages/ResetPassword";
import AuthAction from "./pages/AuthAction";
import Success from "./components/Success";
import Error from "./components/Error";
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
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/signin" />} />
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
              path="/auth/action/"
              element={
                <Grid
                  container
                  justifyContent="center"
                  alignContent="center"
                  className={classes.passwordRecovery}
                >
                  <AuthAction />
                </Grid>
              }
            />

            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Grid
                    container
                    justifyContent="center"
                    alignContent="center"
                    //className={classes.passwordRecovery}
                  >
                    <Dashboard />
                  </Grid>
                </RequireAuth>
              }
            />
            <Route
              path="/twitter"
              element={
                <RequireAuth>
                  <Grid
                    container
                    justifyContent="center"
                    alignContent="center"
                    // className={classes.passwordRecovery}
                  >
                    <Twitter />
                  </Grid>
                </RequireAuth>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </Container>
  );
}

export default App;
