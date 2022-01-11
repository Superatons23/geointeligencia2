import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { AuthContext } from "../../database/Auth";
const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  typography: {
    margin: "10px 0",
  },
  btnSignIn: {
    marginTop: "10px",
    textTransform: "capitalize",
    backgroundColor: "#0070ba",
    "&:hover": {
      backgroundColor: "#005ea6;",
    },
  },
  textFieldUser: {
    marginBottom: "25px ",
  },
  gridDesktop: {
    maxWidth: "350px",
    [theme.breakpoints.down(770)]: {
      display: "none",
    },
  },
  gridTabletMobil: {
    margin: "20px 35px 20px 35px",
    maxWidth: "350px",
    [theme.breakpoints.up(770)]: {
      display: "none",
    },
  },
  alert: {
    marginBottom: "20px",
  },
}));
const initialValues = {
  email: "",
  password: "",
};
const Login = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const classes = useStyles();
  let navigate = useNavigate();

  //obtener la ruta que ingresaron
  let location = useLocation();
  let from = location.state?.from?.pathname || "/dashboard";

  const paperStyle = {
    padding: 40,
    margin: "20px auto",
  };

  const handleSubmit = (e) => {
    if (validate()) {
      signIn();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const validate = (e) => {
    let temp = {};
    temp.password = values.password ? "" : "this field is required.";

    if (!values.email) {
      temp.email = "this field is required.";
    } else if (!/$^|.+@.+..+/.test(values.email)) {
      temp.email = "E-mail is not valid.";
    }
    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  //iniciar sesion
  const signIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in

        const user = userCredential.user;

        navigate(`${from}`);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setAlertOpen(true);
      });
  };
  //redireccionar a la ruta donde venia si ya esta iniciada sesion
  const { currentUser } = useContext(AuthContext);
  if (currentUser !== null) {
    return <Navigate to={from} />;
  }

  const Form = () => {
    return (
      <>
        <Grid item align="center">
          <h2>icono</h2>
          <h2>Sign In</h2>
        </Grid>
        <Collapse in={alertOpen}>
          <Alert
            onClose={() => {
              setAlertOpen(false);
            }}
            className={classes.alert}
            severity="error"
          >
            Incorrect username or password
          </Alert>
        </Collapse>

        <TextField
          variant="outlined"
          label="Username"
          placeholder="Enter username"
          fullWidth
          onChange={handleInputChange}
          name="email"
          value={values.email}
          {...(errors.email && {
            error: true,
            helperText: errors.email,
          })}
          className={classes.textFieldUser}
        />
        <TextField
          variant="outlined"
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          value={values.password}
          onChange={handleInputChange}
          name="password"
          {...(errors.password && {
            error: true,
            helperText: errors.password,
          })}
        />

        <Typography className={classes.typography}>
          <Link
            className={classes.link}
            style={{ color: "#0070ba" }}
            to="/password-recovery"
          >
            Forgot password?
          </Link>
        </Typography>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className={classes.btnSignIn}
          fullWidth
          onClick={handleSubmit}
          classes={{
            contained: classes.containedBtnSubmit,
            label: classes.labelBtn,
          }}
        >
          Sign in
        </Button>
      </>
    );
  };

  return (
    <>
      <Grid component={Box} item className={classes.gridDesktop}>
        <Paper elevation={10} style={paperStyle}>
          <Form />
        </Paper>
      </Grid>
      <Grid component={Box} item className={classes.gridTabletMobil}>
        <Form />
      </Grid>
    </>
  );
};

export default Login;
