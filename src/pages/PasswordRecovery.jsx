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
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
const useStyles = makeStyles((theme) => ({
  btnSignIn: {
    marginTop: "5px 0",
    textTransform: "capitalize",
    backgroundColor: "#0070ba",
    "&:hover": {
      backgroundColor: "#005ea6;",
    },
  },
  link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  typography: {
    marginTop: "10px",
  },
  textFieldUser: {
    marginBottom: "25px ",
    marginTop: "25px",
  },
  avatarStyle: {
    backgroundColor: "#1bbd7e",
    marginBottom: "40px",
  },
  gridDesktop: {
    maxWidth: "450px",
    [theme.breakpoints.down(770)]: {
      display: "none",
    },
  },
  gridTabletMobil: {
    margin: "20px 35px 20px 35px",
    maxWidth: "450px",
    [theme.breakpoints.up(770)]: {
      display: "none",
    },
  },
  alertInfo: {
    marginBottom: "10px",
  },
}));
const initialValues = {
  email: "",
};
const PasswordRecovery = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [alertOpenWarning, setAlertOpenWarning] = useState(true);
  const [alertOpenInfo, setAlertOpenInfo] = useState(true);

  const classes = useStyles();
  const auth = getAuth();

  const paperStyle = {
    padding: 40,
    margin: "20px auto",
  };

  const handleSubmit = (e) => {
    if (validate()) {
      sendEmail();
    }
  };
  const sendEmail = () => {
    sendPasswordResetEmail(auth, values.email)
      .then(() => {
        setValues(initialValues);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setValues(initialValues);
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

  const Form = () => {
    return (
      <>
        <Grid item align="center">
          {/** <Avatar className={classes.avatarStyle}>
            <h1>icono</h1>
          </Avatar>*/}
          <h2>icono</h2>
          <h1>Forgot password?</h1>
          <p>
            Please enter the email you use, we’ll help you create a new password
            in two quick steps
          </p>
        </Grid>
        <Collapse in={alertOpenInfo}>
          <Alert
            onClose={() => {
              setAlertOpenInfo(false);
            }}
            severity="warning"
            className={classes.alertInfo}
          >
            If the email address exists, we'll email instructions to you
          </Alert>
        </Collapse>
        <Collapse in={alertOpenWarning}>
          <Alert
            onClose={() => {
              setAlertOpenWarning(false);
            }}
            severity="warning"
          >
            If the email address does not exist, you'll receive nothing
          </Alert>
        </Collapse>
        <TextField
          variant="outlined"
          label="Email"
          placeholder=""
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
          Reset password
        </Button>
        <Grid item align="center">
          <Typography className={classes.typography}>
            <Link
              className={classes.link}
              style={{ color: "#0070ba" }}
              to="/signin"
            >
              Return to sign in
            </Link>
          </Typography>
        </Grid>
      </>
    );
  };

  return (
    <>
      <Grid item className={classes.gridDesktop}>
        <Paper elevation={10} style={paperStyle}>
          <Form />
        </Paper>
      </Grid>
      <Grid item className={classes.gridTabletMobil}>
        <Form />
      </Grid>
    </>
  );
};

export default PasswordRecovery;
