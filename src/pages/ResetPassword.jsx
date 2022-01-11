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
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import Success from "../components/Success";
import Error from "../components/Error";

const useStyles = makeStyles((theme) => ({
  btnSignIn: {
    marginTop: "5px 0",
    textTransform: "capitalize",
    backgroundColor: "#0070ba",
    "&:hover": {
      backgroundColor: "#005ea6;",
    },
  },
  typography: {
    marginTop: "10px",
  },
  a: {
    color: "#0070ba",
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
  link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
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
    maxWidth: "450px",
  },
}));
const initialValues = {
  password: "",
};
const ResetPassword = ({ auth, actionCode, continueUrl }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const classes = useStyles();
  const [alertOpen, setAlertOpen] = useState(true);
  let navigate = useNavigate();
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [error, setError] = useState(false);

  const paperStyle = {
    padding: 40,
    margin: "20px auto",
  };

  const handleSubmit = (e) => {
    if (validate()) {
      sendResetPassword();
    }
  };
  const sendResetPassword = () => {
    // Verify the password reset code is valid.
    verifyPasswordResetCode(auth, actionCode)
      .then((email) => {
        const accountEmail = email;

        // TODO: Show the reset screen with the user's email and ask the user for
        // the new password.
        const newPassword = "...";

        // Save the new password.
        confirmPasswordReset(auth, actionCode, values.password)
          .then((resp) => {
            // Password reset has been confirmed and new password updated.
            // TODO: Display a link back to the app, or sign-in the user directly
            // if the page belongs to the same domain as the app:
            // auth.signInWithEmailAndPassword(accountEmail, newPassword);
            // TODO: If a continue URL is available, display a button which on
            // click redirects the user back to the app via continueUrl with
            // additional state determined from that URL's parameters.
            setIsResetPassword(true);
          })
          .catch((error) => {
            // Error occurred during confirmation. The code might have expired or the
            // password is too weak.

            setError(true);
            setIsResetPassword(true);
          });
      })
      .catch((error) => {
        // Invalid or expired action code. Ask user to try to reset the password
        // again.

        setError(true);
        setIsResetPassword(true);
      });
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
    //temp.password = values.password ? "" : "this field is required.";

    if (values.password) {
      temp.password = values.password.length > 7 ? "" : "too short";
    } else {
      temp.password = "this field is required.";
    }
    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  const ShowMessage = () => {
    if (error) {
      return <Error />;
    }

    return <Success />;
  };
  return (
    <>
      {!isResetPassword ? (
        <Grid item className={classes.gridMain}>
          <Paper elevation={10} style={paperStyle}>
            <Grid item align="center">
              {/** <Avatar className={classes.avatarStyle}>
          <h1>icono</h1>
        </Avatar>*/}
              <h2>icono</h2>
              <h1>Create a new password</h1>
              <p>
                Choose a password that is unique to this account and that is at
                least 8 characters long.
              </p>
            </Grid>

            <TextField
              variant="outlined"
              label="password"
              placeholder=""
              fullWidth
              type="password"
              onChange={handleInputChange}
              name="password"
              value={values.password}
              {...(errors.password && {
                error: true,
                helperText: errors.password,
              })}
              className={classes.textFieldUser}
            />

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
              Save
            </Button>

            <Grid item align="center">
              <Typography className={classes.typography}>
                <a
                  className={classes.a}
                  onClick={() => navigate("/signin", { replace: true })}
                >
                  Return to sign in
                </a>
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      ) : (
        <ShowMessage />
      )}
    </>
  );
};

export default ResetPassword;
