import React, { useState } from "react";
import "../assets/PasswordRecovery.css";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { useNavigate, Navigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const useStyles = makeStyles((theme) => ({
  btnSignIn: {
    marginTop: "5px 0",
    textTransform: "none",
    backgroundColor: "#0070ba",
    "&:hover": {
      backgroundColor: "#005ea6;",
    },
  },
  a: {
    color: "#0070ba",
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
  typography: {
    margin: "10px 0",
  },
  textFieldUser: {
    marginBottom: "25px ",
    marginTop: "25px",
  },
  avatarStyle: {
    backgroundColor: "#1bbd7e",
    marginBottom: "40px",
  },
  gridMain: {
    maxWidth: "420px",
  },
}));
const initialValues = {
  password: "",
};
const Error = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const classes = useStyles();
  let navigate = useNavigate();
  const auth = getAuth();

  const paperStyle = {
    padding: 40,
    margin: "20px auto",
  };

  const handleSubmit = (e) => {
    navigate("/signin", { replace: true });
  };
  const sendEmail = () => {
    navigate("/password-recovery", { replace: true });
  };
  return (
    <Grid item className={classes.gridMain}>
      <Paper elevation={10} style={paperStyle}>
        <Grid item align="center">
          {/** <Avatar className={classes.avatarStyle}>
            <h1>icono</h1>
          </Avatar>*/}
          <h2>icono</h2>
          <h1>Password error reset</h1>
        </Grid>

        <Alert severity="error" className={classes.alert}>
          Sorry, your password reset link might have expired
        </Alert>

        <Typography className={classes.typography}>
          <a className={classes.a} onClick={() => sendEmail()}>
            Request a new password
          </a>
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
          Go to Sign In
        </Button>
      </Paper>
    </Grid>
  );
};

export default Error;
